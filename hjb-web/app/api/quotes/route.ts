import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/src/modules/auth/auth.middleware";
import { createQuoteService, listQuotesService } from "@/src/modules/quotes/quotes.service";
import { checkRateLimit, RateLimitError } from "@/src/lib/rate-limit";

export async function GET(request: Request) {
  const auth = await isAdminAuthenticated();
  if (!auth) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? undefined;
  const from = searchParams.get("from") ?? undefined;
  const to = searchParams.get("to") ?? undefined;

  const result = await listQuotesService(status, from, to);
  if (result.error) {
    return NextResponse.json({ success: false, error: "No se pudo listar" }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: result.data ?? [] });
}

export async function POST(request: Request) {
  try {
    // Verificar rate limiting
    checkRateLimit(request);

    const body = await request.json();
    const result = await createQuoteService(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(error.retryAfter),
          },
        }
      );
    }

    const message = error instanceof Error ? error.message : "Error interno del servidor";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
