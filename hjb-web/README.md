# HJB Premium Cuts

Sitio web informativo para Héctor Julio Báez Fuentes, dedicado a la venta al por mayor de lomo fino de res empacado al vacío.

## Qué incluye
- Página pública con información de marca, producto, calidad e INVIMA.
- Formulario de cotización conectado a un endpoint de backend.
- Panel administrativo para revisar y actualizar estados de cotización.
- SEO básico con sitemap, robots y Open Graph.

## Variables de entorno
Copie [.env.example](.env.example) a .env.local y complete los valores reales:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD
- NOTIFY_EMAIL
- ADMIN_EMAIL / ADMIN_PASSWORD
- NEXT_PUBLIC_SITE_URL

## Comandos
- npm install
- npm run dev
- npm run build

## Estado de implementación
- Formulario público operativo
- API de cotizaciones con guardado y notificación
- Login y dashboard administrativo
- SEO y metadatos básicos
