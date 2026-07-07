import { createQuote, listQuotes, getQuoteById, updateQuoteStatus } from "./quotes.repository";
import { validateQuotePayload } from "./quotes.schema";
import { sendQuoteNotification } from "../mail/mail.service";
import type { QuoteCreatePayload } from "./quotes.types";

export async function createQuoteService(payload: Record<string, unknown>) {
  const validatedPayload = await validateQuotePayload(payload);

  const quote = await createQuote(validatedPayload as QuoteCreatePayload);

  if (quote.error) {
    throw new Error("No se pudo guardar la cotización");
  }

  const mailResult = await sendQuoteNotification({
    fullName: validatedPayload.fullName,
    companyName: validatedPayload.companyName,
    phone: validatedPayload.phone,
    email: validatedPayload.email,
    estimatedQuantity: validatedPayload.estimatedQuantity,
    message: validatedPayload.message,
  });

  if (!mailResult.success && !("method" in mailResult)) {
    console.error("Mail error", mailResult);
  }

  if (quote.fallback) {
    return {
      success: true,
      data: {
        id: "local-demo",
        status: "nueva",
        createdAt: new Date().toISOString(),
      },
    };
  }

  return {
    success: true,
    data: {
      id: quote.data?.id ?? "pending",
      status: quote.data?.status ?? "nueva",
      createdAt: quote.data?.created_at ?? new Date().toISOString(),
    },
  };
}

export async function getQuoteByIdService(id: string) {
  return getQuoteById(id);
}

export async function listQuotesService(status?: string, from?: string, to?: string) {
  const result = await listQuotes(status, from, to);
  return result;
}

export async function updateQuoteStatusService(id: string, status: string) {
  return updateQuoteStatus(id, status);
}
