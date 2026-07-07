import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const ADMIN_SESSION_KEY = "hjb-admin-auth";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function isAdminAuthenticated() {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_KEY)?.value;
  if (!token) return false;

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: { user }, error } = await supabase.auth.getUser(token);
    return !error && user !== null;
  } catch (err) {
    console.error("Auth validation error:", err);
    return false;
  }
}

export async function setAdminSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_KEY, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_KEY, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
