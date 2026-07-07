import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/src/modules/auth/auth.middleware";
import { getQuoteByIdService, updateQuoteStatusService } from "@/src/modules/quotes/quotes.service";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await isAdminAuthenticated();
  if (!auth) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 });
  }

  try {
    const result = await getQuoteByIdService(id);
    if (result.error || !result.data) {
      return NextResponse.json(
        { success: false, error: "Cotización no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al obtener cotización";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await isAdminAuthenticated();
  if (!auth) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const status = String(body?.status ?? "").trim();

  if (!status) {
    return NextResponse.json({ success: false, error: "Estado requerido" }, { status: 400 });
  }

  const result = await updateQuoteStatusService(id, status);
  if (result.error) {
    return NextResponse.json({ success: false, error: "No se pudo actualizar" }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
