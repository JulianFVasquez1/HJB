-- ============================================
-- Script de Migración: Tabla de Cotizaciones
-- ============================================
-- Ejecutar este script en el SQL Editor de Supabase

-- 1. Crear tabla de cotizaciones
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  estimated_quantity TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'nueva',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Crear índices para optimizar queries
CREATE INDEX IF NOT EXISTS quotes_status_idx ON quotes(status);
CREATE INDEX IF NOT EXISTS quotes_created_at_idx ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS quotes_email_idx ON quotes(email);

-- 3. Habilitar RLS (Row Level Security)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- 4. Política: Permitir inserciones públicas (desde formulario de contacto)
DROP POLICY IF EXISTS allow_public_insert ON quotes;
CREATE POLICY allow_public_insert 
ON quotes FOR INSERT 
TO public 
WITH CHECK (true);

-- 5. Política: Permitir lectura completa al rol de servicio (admin API)
DROP POLICY IF EXISTS allow_service_select ON quotes;
CREATE POLICY allow_service_select 
ON quotes FOR SELECT 
TO service_role 
USING (true);

-- 6. Política: Permitir actualización completa al rol de servicio (cambios de estado)
DROP POLICY IF EXISTS allow_service_update ON quotes;
CREATE POLICY allow_service_update 
ON quotes FOR UPDATE 
TO service_role 
USING (true) 
WITH CHECK (true);

-- 7. Crear función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_quotes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Crear trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS quotes_updated_at_trigger ON quotes;
CREATE TRIGGER quotes_updated_at_trigger
BEFORE UPDATE ON quotes
FOR EACH ROW
EXECUTE FUNCTION update_quotes_updated_at();
