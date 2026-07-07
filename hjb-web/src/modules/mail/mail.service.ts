import nodemailer from "nodemailer";
import { generateQuoteEmailTemplate } from "./templates/quote-email";

export async function sendQuoteNotification(payload: {
  fullName: string;
  companyName?: string;
  phone: string;
  email: string;
  estimatedQuantity?: string;
  message?: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  // Si EmailJS está configurado de forma explícita, usarlo prioritariamente
  if (serviceId && templateId && publicKey && notifyEmail) {
    return await sendQuoteNotificationViaEmailJS(payload);
  }

  // Si SMTP no está configurado y EmailJS no se ha ejecutado, intentar EmailJS como fallback
  if (!host || !user || !pass || !notifyEmail) {
    console.warn("SMTP no configurado, intentando con EmailJS fallback...");
    return await sendQuoteNotificationViaEmailJS(payload);
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const htmlContent = generateQuoteEmailTemplate(
      payload.fullName,
      payload.companyName,
      payload.phone,
      payload.email,
      payload.estimatedQuantity,
      payload.message
    );

    await transporter.sendMail({
      from: `HJB <${user}>`,
      to: notifyEmail,
      replyTo: payload.email,
      subject: `📩 Nueva Cotización de ${payload.fullName}`,
      html: htmlContent,
    });

    return { success: true, method: "smtp" };
  } catch (error) {
    console.error("Error enviando por SMTP:", error);
    console.warn("Recurriendo a EmailJS fallback...");
    return await sendQuoteNotificationViaEmailJS(payload);
  }
}

/**
 * Fallback: Enviar notificación vía EmailJS
 * Requiere EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY en .env
 */
async function sendQuoteNotificationViaEmailJS(payload: {
  fullName: string;
  companyName?: string;
  phone: string;
  email: string;
  estimatedQuantity?: string;
  message?: string;
}) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!serviceId || !templateId || !publicKey || !notifyEmail) {
    return {
      success: false,
      method: "emailjs",
      reason: "EmailJS no configurado",
    };
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        ...(privateKey ? { accessToken: privateKey } : {}),
        template_params: {
          to_email: notifyEmail,
          from_name: payload.fullName,
          from_email: payload.email,
          phone: payload.phone,
          company: payload.companyName || "No especificada",
          quantity: payload.estimatedQuantity || "No especificada",
          message: payload.message,
          reply_to: payload.email,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`EmailJS error: ${response.statusText}`);
    }

    return { success: true, method: "emailjs" };
  } catch (error) {
    console.error("Error enviando vía EmailJS:", error);
    return {
      success: false,
      method: "emailjs",
      reason: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
