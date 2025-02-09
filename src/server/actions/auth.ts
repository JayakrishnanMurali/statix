/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { env } from "@/env";

export async function signUp(email: string, password: string) {
  const supabase = await createServerSupabaseClient();

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (authError) throw authError;

    // Create user in Drizzle database
    if (authData.user) {
      await db.insert(users).values({
        id: authData.user.id,
        email: authData.user.email!,
      });
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function login(email: string, password: string) {
  const supabase = await createServerSupabaseClient();

  try {
    const { error: authError, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      // Log the error for debugging purposes.
      console.error("Supabase auth error:", authError);
      throw authError;
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function logout() {
  try {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function getUser() {
  try {
    const supabase = await createServerSupabaseClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
