import { supabaseServer } from "@/src/lib/supabase-client";
import type { QuoteCreatePayload, QuoteRecord } from "./quotes.types";

export async function createQuote(record: QuoteCreatePayload) {
  if (!supabaseServer) {
    return {
      data: null,
      error: null,
      fallback: true,
    };
  }

  const { data, error } = await supabaseServer.from("quotes").insert({
    full_name: record.fullName,
    company_name: record.companyName,
    phone: record.phone,
    email: record.email,
    estimated_quantity: record.estimatedQuantity,
    message: record.message,
    status: "nueva",
  }).select().single();

  return {
    data: data as QuoteRecord | null,
    error,
    fallback: false,
  };
}

export async function getQuoteById(id: string) {
  if (!supabaseServer) {
    return { data: null, error: null };
  }

  const { data, error } = await supabaseServer
    .from("quotes")
    .select("*")
    .eq("id", id)
    .single();

  return { data: data as QuoteRecord | null, error };
}

export async function listQuotes(status?: string, from?: string, to?: string) {
  if (!supabaseServer) {
    return { data: [], error: null };
  }

  let query = supabaseServer.from("quotes").select("*").order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  if (from) {
    query = query.gte("created_at", from);
  }

  if (to) {
    query = query.lte("created_at", to);
  }

  const { data, error } = await query;
  return { data: data as QuoteRecord[] | null, error };
}

export async function updateQuoteStatus(id: string, status: string) {
  if (!supabaseServer) {
    return { data: null, error: null };
  }

  const { data, error } = await supabaseServer.from("quotes").update({ status }).eq("id", id).select().single();
  return { data: data as QuoteRecord | null, error };
}
