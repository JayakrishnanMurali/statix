import { pgTable, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * Schema for Statix using PostgreSQL with Supabase
 */

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const websites = pgTable("websites", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  subdomain: text("subdomain").notNull().unique(),
  config: jsonb("config").default({}).notNull().$type<{
    title: string;
    description?: string;
    theme?: string;
  }>(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const components = pgTable("components", {
  id: uuid("id").primaryKey().defaultRandom(),
  websiteId: uuid("website_id")
    .notNull()
    .references(() => websites.id),
  type: text("type").notNull(), // 'text', 'image', 'button', etc.
  config: jsonb("config").default({}).notNull().$type<{
    content?: string;
    style?: Record<string, string>;
    props?: Record<string, unknown>;
  }>(),
  animation: jsonb("animation").default({}).notNull().$type<{
    type?: string;
    duration?: number;
    delay?: number;
    easing?: string;
  }>(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
