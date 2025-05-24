import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken"
import { env } from "../env";
import { UserPayload } from "../@types/fastify";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
    const token = req.cookies.token

    if(!token) return reply.status(401).send({message: "jwt token must be provided"})

    const payload = jwt.verify(token, env.JWT_SECRET) as UserPayload
    
    if(!payload) return reply.status(401).send({message: "user is not logged"}) 
    
    return req.user = payload
}