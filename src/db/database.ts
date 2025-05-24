import knex from "knex";
import { env } from "../../env";

export const knexConfig: knex.Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: "./src/db/app.db",
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./src/db/migrations",
  },
};

export const db = knex(knexConfig);
