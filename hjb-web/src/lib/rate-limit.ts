/**
 * Rate Limiter en memoria simple basado en IP
 * Almacena intentos por IP y valida contra límites configurables
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Configuración de rate limiting
 */
export const RATE_LIMIT_CONFIG = {
  WINDOW_MS: 60 * 60 * 1000, // 1 hora
  MAX_REQUESTS_PER_WINDOW: 10, // máximo 10 solicitudes por IP por hora
  CLEANUP_INTERVAL_MS: 60 * 60 * 1000, // limpiar cada hora
};

/**
 * Iniciar limpieza periódica de registros expirados
 */
function startRateLimitCleanup() {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (record.resetTime < now) {
        rateLimitMap.delete(ip);
      }
    }
  }, RATE_LIMIT_CONFIG.CLEANUP_INTERVAL_MS);
}

// Iniciar limpieza al cargar el módulo
startRateLimitCleanup();

/**
 * Extraer IP del cliente desde Request (soporta proxies)
 */
function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

/**
 * Verificar si una IP ha excedido el límite de rate limiting
 * Lanza una excepción si se excede el límite
 */
export function checkRateLimit(request: Request): void {
  const ip = getClientIP(request);
  const now = Date.now();

  const record = rateLimitMap.get(ip);

  // Si no existe registro o ya expiró, crear uno nuevo
  if (!record || record.resetTime < now) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_CONFIG.WINDOW_MS,
    });
    return; // Primera solicitud, permitir
  }

  // Incrementar contador
  record.count++;

  // Verificar si se excedió el límite
  if (record.count > RATE_LIMIT_CONFIG.MAX_REQUESTS_PER_WINDOW) {
    const resetDate = new Date(record.resetTime);
    throw new RateLimitError(
      `Límite de solicitudes excedido. Intente nuevamente después de ${resetDate.toLocaleTimeString("es-CO")}`,
      record.resetTime
    );
  }
}

/**
 * Excepción personalizada para Rate Limit
 */
export class RateLimitError extends Error {
  public retryAfter: number;

  constructor(message: string, resetTime: number) {
    super(message);
    this.name = "RateLimitError";
    this.retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
  }
}
