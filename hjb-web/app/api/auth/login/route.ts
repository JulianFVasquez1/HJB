import { NextResponse } from "next/server";
import { setAdminSession } from "@/src/modules/auth/auth.middleware";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Correo y contraseña requeridos" }, { status: 400 });
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ success: false, error: "Supabase no configurado" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return NextResponse.json({ success: false, error: error?.message || "Credenciales inválidas" }, { status: 401 });
    }

    await setAdminSession(data.session.access_token);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al iniciar sesión";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
