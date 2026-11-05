import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  hasUrl: boolean;
  hasKey: boolean;
  error?: string;
}

export function getSupabaseConfigStatus(): SupabaseConfigStatus {
  const hasUrl = Boolean(supabaseUrl && supabaseUrl.trim().length > 0);
  const hasKey = Boolean(supabasePublishableKey && supabasePublishableKey.trim().length > 0);

  if (!hasUrl && !hasKey) {
    return {
      isConfigured: false,
      hasUrl: false,
      hasKey: false,
      error: 'Missing both VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local',
    };
  }

  if (!hasUrl) {
    return {
      isConfigured: false,
      hasUrl: false,
      hasKey: true,
      error: 'Missing VITE_SUPABASE_URL in .env.local',
    };
  }

  if (!hasKey) {
    return {
      isConfigured: false,
      hasUrl: true,
      hasKey: false,
      error: 'Missing VITE_SUPABASE_PUBLISHABLE_KEY in .env.local',
    };
  }

  return {
    isConfigured: true,
    hasUrl: true,
    hasKey: true,
  };
}

const configStatus = getSupabaseConfigStatus();

if (!configStatus.isConfigured) {
  console.warn(`[Shilpo Bajar] Supabase configuration warning: ${configStatus.error}`);
}

export const isSupabaseConfigured = configStatus.isConfigured;

// Create client using provided environment variables, or empty strings if unconfigured
export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublishableKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Performs a safe, read-only connectivity check with the Supabase project.
 * Does not read, insert, update, or delete any user/table records.
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  status: string;
  error?: string;
  authEndpointAvailable: boolean;
}> {
  const status = getSupabaseConfigStatus();

  if (!status.isConfigured) {
    return {
      connected: false,
      status: 'unconfigured',
      error: status.error,
      authEndpointAvailable: false,
    };
  }

  try {
    // 1. Safe Auth heartbeat check: calls getSession() which inspects local storage
    // or pings GoTrue auth server safely without writing anything.
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      return {
        connected: false,
        status: 'auth_error',
        error: sessionError.message,
        authEndpointAvailable: false,
      };
    }

    return {
      connected: true,
      status: 'connected',
      authEndpointAvailable: true,
    };
  } catch (err: any) {
    return {
      connected: false,
      status: 'network_error',
      error: err?.message || 'Failed to reach Supabase project endpoint',
      authEndpointAvailable: false,
    };
  }
}

