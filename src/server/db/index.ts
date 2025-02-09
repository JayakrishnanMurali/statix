import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/env";
import * as schema from "./schema";

// Define a type for the PostgreSQL client based on the return type of `postgres`
type ClientType = ReturnType<typeof postgres>;

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR update.
 */
const globalForDb = globalThis as unknown as { client?: ClientType };

export const client: ClientType =
  globalForDb.client ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
