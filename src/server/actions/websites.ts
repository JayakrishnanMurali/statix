/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { authenticateUser } from "@/server/actions/authenticate-user";
import { db } from "@/server/db";
import { websites } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getWebsites() {
  try {
    const user = await authenticateUser();

    const sites = await db
      .select()
      .from(websites)
      .where(eq(websites.userId, user.id))
      .orderBy(desc(websites.createdAt));

    return { success: true, data: sites };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function getWebsiteById(websiteId: string) {
  try {
    const user = await authenticateUser();

    const website = await db
      .select()
      .from(websites)
      .where(eq(websites.id, websiteId))
      .limit(1)
      .then((res) => res[0]);

    if (!website) {
      throw new Error("Website not found");
    }

    if (website.userId !== user.id) {
      throw new Error("Unauthorized");
    }

    return { success: true, data: website };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function createWebsite({
  name,
  subdomain,
  config,
  userId,
}: {
  name: string;
  subdomain: string;
  config: Record<string, any>;
  userId: string;
}) {
  try {
    await authenticateUser(userId);

    const [newWebsite] = await db
      .insert(websites)
      .values({
        name: name,
        subdomain: subdomain,
        config: config as {
          title: string;
          description?: string;
          theme?: string;
        },
        userId: userId,
      })
      .returning();

    if (!newWebsite) throw new Error("Failed to create website");

    return { success: true, data: newWebsite };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
