import { z } from "zod";

// Validación Zod para input de cotización
export const quoteInputSchema = z.object({
  fullName: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es muy largo"),
  companyName: z.string().trim().max(100, "El nombre de la empresa es muy largo").optional().or(z.literal("")),
  phone: z.string().trim().regex(/^[\d\s+\-()]+$/, "Teléfono no válido").min(7, "El teléfono debe tener al menos 7 dígitos"),
  email: z.string().trim().email("El correo no es válido"),
  estimatedQuantity: z.string().trim().max(200, "La cantidad estimada es muy larga").optional().or(z.literal("")),
  message: z.string().trim().max(5000, "El mensaje es muy largo").optional().or(z.literal("")),
  honeypot: z.string().trim().optional().or(z.literal("")),
});

// Aplicar validación de honeypot después de parsear
export const quoteInputSchemaWithHoneypot = quoteInputSchema.refine(
  (data) => !data.honeypot || data.honeypot === "",
  { message: "Solicitud no válida", path: ["honeypot"] }
);

export type QuoteInput = z.infer<typeof quoteInputSchemaWithHoneypot>;

export async function validateQuotePayload(payload: unknown): Promise<QuoteInput> {
  try {
    return await quoteInputSchemaWithHoneypot.parseAsync(payload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((e) => e.message).join("; ");
      throw new Error(messages);
    }
    throw error;
  }
}
