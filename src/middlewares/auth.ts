import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken"
import { env } from "../../env";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
    const token = req.cookies.token

    if(!token) return reply.status(401).send({message: "jwt token must be provided"})

    const isTokenValid = jwt.verify(token, env.JWT_SECRET)
    
    if(!isTokenValid) return reply.status(401).send({message: "user is not logged"})
}