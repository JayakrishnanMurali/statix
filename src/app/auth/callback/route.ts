import { createServerSupabaseClient } from "@/lib/supabase/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return Response.redirect(new URL(next, request.url));
    }
  }

  // Return the user to an error page with some instructions
  return Response.redirect(new URL("/auth/auth-error", request.url));
}
