export function generateQuoteEmailTemplate(
  fullName: string,
  companyName: string | undefined,
  phone: string,
  email: string,
  estimatedQuantity: string | undefined,
  message: string | undefined
): string {

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Cotización - HJB</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #991b1b 0%, #dc2626 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .header p {
      margin: 8px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      padding: 30px 20px;
    }
    .section {
      margin-bottom: 25px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 700;
      color: #991b1b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0 0 10px 0;
      border-bottom: 2px solid #fde047;
      padding-bottom: 8px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 15px;
    }
    .info-item {
      background: #f9fafb;
      padding: 12px;
      border-radius: 6px;
      font-size: 13px;
    }
    .info-item strong {
      display: block;
      color: #991b1b;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 5px;
    }
    .message-box {
      background: #f0f9ff;
      border-left: 4px solid #991b1b;
      padding: 15px;
      border-radius: 4px;
      font-size: 13px;
      line-height: 1.7;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .footer {
      background: #f3f4f6;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
      border-top: 1px solid #e5e7eb;
    }
    .badge {
      display: inline-block;
      background: #fde047;
      color: #000;
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 11px;
      font-weight: 600;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🥩 Nueva Cotización Recibida</h1>
      <p>HJB - Lomo Fino de Res Premium</p>
    </div>
    
    <div class="content">
      <div class="section">
        <div class="section-title">Información del Cliente</div>
        <div class="info-grid">
          <div class="info-item">
            <strong>Nombre</strong>
            ${escapeHtml(fullName)}
          </div>
          <div class="info-item">
            <strong>Teléfono</strong>
            <a href="tel:${encodeURIComponent(phone)}" style="color: #991b1b; text-decoration: none;">
              ${escapeHtml(phone)}
            </a>
          </div>
          <div class="info-item">
            <strong>Correo</strong>
            <a href="mailto:${encodeURIComponent(email)}" style="color: #991b1b; text-decoration: none;">
              ${escapeHtml(email)}
            </a>
          </div>
          ${companyName ? `<div class="info-item">
            <strong>Empresa</strong>
            ${escapeHtml(companyName)}
          </div>` : ""}
        </div>
      </div>

      ${estimatedQuantity ? `<div class="section">
        <div class="section-title">Requerimiento</div>
        <div class="info-item">
          <strong>Cantidad Estimada</strong>
          ${escapeHtml(estimatedQuantity)}
        </div>
      </div>` : ""}

      <div class="section">
        <div class="section-title">Mensaje / Detalles</div>
        <div class="message-box">${escapeHtml(message || "Sin mensaje adicional.")}</div>
      </div>

      <div class="section">
        <p style="margin: 0; font-size: 13px; color: #666;">
          <strong>Fecha de Solicitud:</strong> ${new Date().toLocaleString("es-CO")}
        </p>
        <p style="margin: 8px 0 0 0; font-size: 13px;">
          <span class="badge">NUEVA COTIZACIÓN</span>
        </p>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0;">
        Panel de Administración: <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard" style="color: #991b1b; text-decoration: none;">Acceder al Dashboard</a>
      </p>
      <p style="margin: 8px 0 0 0;">
        © ${new Date().getFullYear()} HJB. Todos los derechos reservados.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Escapa caracteres HTML para prevenir inyección de código
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
