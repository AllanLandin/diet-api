import "fastify"
import jwt from "jsonwebtoken"

interface UserPayload {
    id: number
    email: string
    iat: number
    exp: number
}

declare module "fastify" {
  interface FastifyRequest {
    user: UserPayload;
  }
}