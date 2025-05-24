import { FastifyInstance } from "fastify"
import { authMiddleware } from "../middlewares/auth"

export async function userRoutes(app: FastifyInstance){
    app.get("/", {preHandler: authMiddleware}, (req, reply)=>{
        reply.send("Você verá isso se estiver logado!")
    })
}