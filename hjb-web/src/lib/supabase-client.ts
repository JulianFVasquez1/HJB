import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if a URL is valid (starts with http:// or https://) and not a placeholder
const isValidSupabaseUrl = (url?: string) => {
  if (!url) return false;
  if (url === "tu_url_de_supabase") return false;
  return url.startsWith("http://") || url.startsWith("https://");
};

// Check if a key is valid and not a placeholder
const isValidSupabaseKey = (key?: string) => {
  if (!key) return false;
  return key !== "tu_anon_key_de_supabase" && key !== "tu_service_role_key";
};

export const supabaseBrowser = isValidSupabaseUrl(supabaseUrl) && isValidSupabaseKey(supabaseAnonKey)
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export const supabaseServer = isValidSupabaseUrl(supabaseUrl) && isValidSupabaseKey(serviceRoleKey)
  ? createClient(supabaseUrl!, serviceRoleKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

