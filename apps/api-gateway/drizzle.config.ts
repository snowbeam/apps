import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "src/database/drizzle-schema.ts",
  out: "schema/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL
  }
} satisfies Config;
