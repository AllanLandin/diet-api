import fastify from "fastify";
import { env } from "../env";

const app = fastify();

app.get("/", () => {
  return "teste";
});

app.listen({ port: env.PORT }, () => {
  console.log(`HTTP server running on port ${env.PORT}!`);
});
