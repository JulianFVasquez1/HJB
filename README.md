# HJB Premium Cuts

Sitio web de HJB Premium Cuts (Next.js en `hjb-web/`).

## Despliegue en Vercel

### Opción recomendada (GitHub + Vercel)

1. Sube el código a GitHub (`main`).
2. Entra en [vercel.com/new](https://vercel.com/new) e importa el repositorio.
3. En **Root Directory**, elige `hjb-web` y confirma.
4. En **Environment Variables**, agrega las variables de tu `.env.local` (ver `hjb-web/README.md`).
5. Usa la URL de producción en `NEXT_PUBLIC_APP_URL` y `NEXT_PUBLIC_SITE_URL` (ej. `https://tu-dominio.vercel.app`).
6. Haz clic en **Deploy**.

Cada push a `main` generará un despliegue automático.

### Variables de entorno requeridas

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anon de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave service role (API admin) |
| `NEXT_PUBLIC_APP_URL` | URL pública del sitio |
| `NEXT_PUBLIC_SITE_URL` | URL para metadatos SEO |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` | Email (cotizaciones) |
| `NOTIFY_EMAIL` | Email que recibe las cotizaciones |
| `EMAILJS_*` | Fallback de email (opcional) |

### CLI local

```bash
cd hjb-web
npx vercel
```

Sigue el asistente para vincular el proyecto y desplegar.
