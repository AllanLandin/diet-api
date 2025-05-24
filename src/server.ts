import fastify from "fastify";
import { env } from "./env";
import cookie from "@fastify/cookie"
import { authRoutes } from "./routes/auth";
import { usersRoutes } from "./routes/users";
import { mealsRoutes } from "./routes/meals";

const app = fastify();

app.register(cookie)
app.register(authRoutes, {prefix: "/auth"})
app.register(usersRoutes, {prefix: "/users"})
app.register(mealsRoutes, {prefix: "/meals"})

app.listen({ port: env.PORT }, () => {
  console.log(`HTTP server running on port ${env.PORT}!`);
});
