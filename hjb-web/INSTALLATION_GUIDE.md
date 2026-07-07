# 🛠️ Guía de Instalación y Configuración Final

## Introducción

Este documento contiene los pasos necesarios para llevar el proyecto HJB CUTS a un estado completamente funcional en producción, incluyendo la configuración de la base de datos, variables de entorno y testing.

---

## 1️⃣ Fase 1: Configuración de Base de Datos Supabase

### Paso 1.1: Acceder a Supabase SQL Editor

1. Inicia sesión en [supabase.com](https://supabase.com)
2. Selecciona tu proyecto HJB CUTS
3. En el menú lateral, ve a **SQL Editor**
4. Haz clic en **New Query**

### Paso 1.2: Ejecutar Script de Migración

1. Abre el archivo `src/lib/database.sql` del proyecto
2. Copia **TODO** el contenido
3. Pega en el editor SQL de Supabase
4. Haz clic en el botón **Run** (botón azul con triángulo ▶)

**Resultado esperado:**
```
Query executed successfully
Created table: quotes
Created indexes: 3
Created policies: 3
Created trigger: 1
```

### Paso 1.3: Verificar Creación de Tabla

1. Ve a **Table Editor** en el menú lateral
2. Busca la tabla `quotes` en la lista
3. Verifica que tenga las siguientes columnas:
   - `id` (UUID, Primary Key)
   - `full_name` (Text)
   - `company_name` (Text, nullable)
   - `phone` (Text)
   - `email` (Text)
   - `estimated_quantity` (Text, nullable)
   - `message` (Text)
   - `status` (Text, default: 'nueva')
   - `created_at` (Timestamp with timezone)
   - `updated_at` (Timestamp with timezone)

4. Verifica que **RLS está habilitado** (verde en la tabla)

---

## 2️⃣ Fase 2: Configuración de Variables de Entorno

### Paso 2.1: Completar `.env.local`

Abre el archivo `.env.local` en la raíz del proyecto y asegúrate de que contenga:

```env
# ===== SUPABASE =====
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ===== SMTP (Email Primario) =====
SMTP_HOST=smtp.tuproveedor.com
SMTP_PORT=465
SMTP_USER=tu-email@tudominio.com
SMTP_PASSWORD=tu-contraseña-de-app
NOTIFY_EMAIL=admin@hjbcuts.com

# ===== EMAILJS (Fallback) =====
EMAILJS_SERVICE_ID=service_abc123xyz
EMAILJS_TEMPLATE_ID=template_abc123xyz
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### Paso 2.2: Obtener Credenciales Supabase

1. Ve a **Project Settings** → **API**
2. Copia `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
3. Copia `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Paso 2.3: Configurar SMTP (Recomendado: Gmail o Zoho)

#### Opción A: Gmail con App Password
1. Activa 2FA en tu cuenta Google
2. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Genera contraseña de aplicación para "Mail"
4. Configura:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=tu-email@gmail.com
   SMTP_PASSWORD=tu-app-password-de-16-caracteres
   NOTIFY_EMAIL=tu-email@gmail.com
   ```

#### Opción B: Zoho Mail
1. Configura tu cuenta en [zoho.com/mail](https://zoho.com/mail)
2. Ve a Settings → Accounts → Email Accounts → POP/IMAP
3. Habilita SMTP y copia credenciales:
   ```env
   SMTP_HOST=smtp.zoho.com
   SMTP_PORT=465
   SMTP_USER=tu-email@tudominio.com
   SMTP_PASSWORD=tu-contraseña
   NOTIFY_EMAIL=admin@hjbcuts.com
   ```

### Paso 2.4: Configurar EmailJS (Fallback)

1. Registrate en [emailjs.com](https://emailjs.com)
2. Ve a **Account** → **API Keys** → Copia `Public Key`
3. Ve a **Email Services** y crea uno nuevo
4. Ve a **Email Templates** y crea una plantilla con estos parámetros:
   - `to_email` → Email destino
   - `from_name` → Nombre del cliente
   - `from_email` → Email del cliente
   - `phone` → Teléfono
   - `company` → Empresa
   - `quantity` → Cantidad estimada
   - `message` → Mensaje
5. Copia `Service ID` y `Template ID`
6. Configura en `.env.local`:
   ```env
   EMAILJS_SERVICE_ID=service_abc123xyz
   EMAILJS_TEMPLATE_ID=template_abc123xyz
   EMAILJS_PUBLIC_KEY=your_public_key
   ```

---

## 3️⃣ Fase 3: Build y Testing Local

### Paso 3.1: Build del Proyecto

```bash
cd hjb-web
npm run build
```

**Resultado esperado:**
```
✓ Compiled successfully in X.Xs
✓ Finished TypeScript in X.s
✓ Generated 15 routes
✓ Done
```

### Paso 3.2: Ejecutar en Modo Desarrollo

```bash
npm run dev
```

Accede a `http://localhost:3000` en tu navegador.

### Paso 3.3: Testing del Flujo Completo

#### Test 1: Envío de Cotización
1. Ve a `http://localhost:3000/contacto`
2. Completa el formulario:
   - Nombre: `Test Admin`
   - Empresa: `Test Corp`
   - Teléfono: `+57 300 1234567`
   - Email: `test@ejemplo.com`
   - Cantidad: `500 kg`
   - Mensaje: `Necesito una cotización para mi restaurante de lujo.`
3. Haz clic en **Enviar Cotización**
4. **Verificación:**
   - Deberías ver un mensaje de éxito
   - Deberías recibir un email en `NOTIFY_EMAIL` con los detalles

#### Test 2: Login Admin
1. Ve a `http://localhost:3000/admin/login`
2. Intenta con credenciales NO registradas en Supabase:
   - **Resultado esperado:** Error "Credenciales inválidas"
3. Crea un usuario en Supabase Auth:
   - Ve a **Authentication** → **Users** en Supabase
   - Haz clic en **Add User**
   - Email: `admin@hjbcuts.com`
   - Password: Una contraseña segura
4. Intenta login nuevamente con las credenciales creadas
   - **Resultado esperado:** Redirige a `/admin/dashboard`

#### Test 3: Dashboard Admin
1. En el dashboard (`/admin/dashboard`), deberías ver:
   - Tabla de cotizaciones recientes
   - Filtro por estado (Nueva, Contactado, Cerrada)
   - Búsqueda por nombre/empresa/email
   - Botón de actualizar
2. Haz clic en una fila de la tabla
   - **Resultado esperado:** Se abre un modal con detalles completos
   - Deberías ver: Nombre, Empresa, Teléfono, Email, Cantidad, Mensaje, Fecha
   - Botones: Cambiar estado, Contactar por WhatsApp

#### Test 4: Cambio de Estado
1. En el modal, cambia el estado de "Nueva" a "Contactado"
2. **Verificación:**
   - El modal debe actualizarse instantáneamente
   - Al cerrar y reabrir, debe mantener el estado
   - En Supabase (Table Editor), la fila debe mostrar el nuevo estado

#### Test 5: ContactoWhatsApp
1. En el modal, haz clic en "Contactar por WhatsApp"
2. **Resultado esperado:**
   - Se abre WhatsApp con el número del cliente
   - Message box pre-llenada (opcional)

#### Test 6: Rate Limiting
1. Abre la consola del desarrollador (F12)
2. Copia este script y pégalo en la consola:
   ```javascript
   for(let i = 0; i < 15; i++) {
     fetch('/api/quotes', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         fullName: 'Test ' + i,
         phone: '+573001234567',
         email: 'test' + i + '@test.com',
         message: 'Test message number ' + i,
       })
     }).then(r => r.json()).then(d => console.log(d));
   }
   ```
3. **Resultado esperado:**
   - Los primeros 10 deberían devolver `{ success: true }`
   - La solicitud 11+ debe devolver HTTP 429 con:
     ```json
     { "success": false, "error": "Límite de solicitudes excedido..." }
     ```

---

## 4️⃣ Fase 4: Deployment a Producción

### Opción A: Vercel (Recomendado para Next.js)

1. Push del código a GitHub
2. Ve a [vercel.com](https://vercel.com) y conecta tu repo
3. Configura variables de entorno en Project Settings:
   - Agrega todas las variables de `.env.local`
   - Usa valores de producción (no localhost)
4. Deploy automático en cada push a `main`

### Opción B: Hosting Manual (Netlify, Railway, etc.)

1. Asegúrate de que `.env.production` contiene variables correctas
2. Ejecuta `npm run build`
3. Sube la carpeta `.next` a tu hosting
4. Asegúrate de que Node.js 18+ está disponible

### Verificaciones Pre-Deploy

- [ ] `npm run lint` — 0 errores
- [ ] `npm run build` — Exitoso sin warnings
- [ ] `npm run dev` — Funciona localmente
- [ ] Formulario de contacto envía emails
- [ ] Login admin funciona con credenciales reales
- [ ] Dashboard carga cotizaciones desde Supabase
- [ ] Rate limiting está activo

---

## 🔍 Troubleshooting

### Error: "Supabase no configurado"
**Causa:** Variables de entorno faltantes o incorrectas  
**Solución:**
1. Verifica que `.env.local` contiene `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Reinicia el servidor: `npm run dev`

### Error: "No se pudo guardar la cotización"
**Causa:** Tabla `quotes` no existe o RLS está bloqueando inserciones  
**Solución:**
1. Verifica en Supabase que la tabla `quotes` existe
2. Verifica que la política de insercción pública está habilitada
3. Revisa logs de Supabase en **Logs Explorer**

### Error: "Credenciales inválidas" en login admin
**Causa:** Usuario no existe en Supabase Auth  
**Solución:**
1. Ve a Supabase → **Authentication** → **Users**
2. Crea un nuevo usuario con email y contraseña
3. Intenta login nuevamente

### Emails no llegan
**Causa:** SMTP no configurado correctamente o EmailJS no está disponible  
**Solución:**
1. Verifica credenciales SMTP en `.env.local`
2. Intenta con una contraseña de app (Gmail)
3. Revisa spam/junk folder
4. Revisa logs de Supabase para ver si se ejecutó la función de email

### Rate Limiting bloquea solicitudes legítimas
**Causa:** Límite de 10/hora es muy estricto  
**Solución:**
1. Edita `RATE_LIMIT_CONFIG` en [src/lib/rate-limit.ts](src/lib/rate-limit.ts)
2. Aumenta `MAX_REQUESTS_PER_WINDOW` a 50 o más
3. Reinicia el servidor

---

## 📊 Monitoreo en Producción

### Métricas a Vigilar
- **Email Success Rate:** Logs de Supabase
- **API Endpoint Response Time:** Dashboard de Vercel/Railway
- **Rate Limit Hits:** Logs personalizados
- **Database Connections:** Supabase Metrics

### Logs Recomendados
1. Supabase **Edge Functions** logs
2. Vercel **Functions** logs
3. Email service (SMTP o EmailJS) logs

---

## ✅ Checklist Final

- [ ] Script SQL ejecutado en Supabase
- [ ] Variables de entorno completadas
- [ ] Build exitoso sin errores
- [ ] Tests locales pasados (6/6)
- [ ] Emails siendo enviados
- [ ] Dashboard mostrando cotizaciones
- [ ] Rate limiting activo
- [ ] Código deployado a producción
- [ ] Monitoreo configurado

---

**🚀 ¡Listo para la puesta en marcha!**

Para soporte técnico, revisa:
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Zod](https://zod.dev)
