import knex from "knex";
import { env } from "../env";

export const knexConfig: knex.Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: env.DATABASE_CLIENT === "sqlite3" ? {
    filename: env.DATABASE_URL,
  }: env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    directory: "./src/db/migrations",
  },
};

export const db = knex(knexConfig);
