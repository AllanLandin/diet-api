import { FastifyInstance } from "fastify"
import { authMiddleware } from "../middlewares/auth"

export async function usersRoutes(app: FastifyInstance){
    app.addHook('preHandler', authMiddleware);

    app.get("/", (req, reply)=>{
        reply.send("Você verá isso se estiver logado!")
    })
}