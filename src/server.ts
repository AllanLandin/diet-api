import fastify from "fastify";
import { env } from "../env";
import { authRoutes } from "./routes/auth";
import cookie from "@fastify/cookie"
import { userRoutes } from "./routes/user";

const app = fastify();

app.register(cookie)
app.register(authRoutes, {prefix: "/auth"})
app.register(userRoutes, {prefix: "/users"})

app.listen({ port: env.PORT }, () => {
  console.log(`HTTP server running on port ${env.PORT}!`);
});
