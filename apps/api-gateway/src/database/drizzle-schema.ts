import { pgTable, varchar, text } from "drizzle-orm/pg-core";
import { init } from "@paralleldrive/cuid2";

const createId = init({ length: 64, fingerprint: "snowbeam-api-gateway" });

export const users = pgTable("users", {
  id: varchar("id", { length: 64 })
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),
  username: varchar("username", { length: 12 }).notNull()
});

export const dbHooks = pgTable("db_hooks", {
  id: varchar("id", { length: 64 })
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),
  script: text("script").notNull()
});
