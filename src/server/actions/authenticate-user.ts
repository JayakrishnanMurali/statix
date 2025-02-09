import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function authenticateUser(requiredUserId?: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  if (requiredUserId && user.id !== requiredUserId) {
    throw new Error("Unauthorized");
  }

  return user;
}
