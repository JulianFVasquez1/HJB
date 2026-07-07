export type QuoteStatus = "nueva" | "contactado" | "cerrada";

export interface QuoteRecord {
  id: string;
  full_name: string;
  company_name: string;
  phone: string;
  email: string;
  estimated_quantity: string;
  message: string;
  status: QuoteStatus;
  created_at: string;
  updated_at: string;
}

export interface QuoteCreatePayload {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  estimatedQuantity: string;
  message: string;
  honeypot?: string;
}
