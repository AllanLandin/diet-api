import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db/database";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { env } from "../../env";

export async function authRoutes(app: FastifyInstance){
    app.post("/register", async (req, reply)=>{
        
        const registerBodySchema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
            birthday: z.string()
        })
       
        const parseResult = registerBodySchema.safeParse(req.body)
        
        if(!parseResult.success) return reply.status(409).send({message: "request body is incomplete!"})

        const {name, email, password, birthday} = parseResult.data
        

        const result = await db('users').where('email', email)
        
        if(result[0]) return reply.status(409).send({
            message: "email already in use!"
        })

        const hashedPassword = bcrypt.hashSync(password, 10)
        
        await db("users").insert({name, email, password: hashedPassword, birthday: new Date(birthday) })

        return reply.status(201).send(result)
    })

    
    app.post("/login", async (req, reply)=>{
    
        const loginBodySchema = z.object({
            email: z.string(),
            password: z.string()
        })
       
        const parseResult = loginBodySchema.safeParse(req.body)

        if(!parseResult.success) return reply.status(409).send({message: ""})

        const {email, password} = parseResult.data

        const user = await db("users").where("email", email).select("*").first()
              
        if(!user || !await bcrypt.compare(password, user.password)) reply.status(401).send("invalid credentials!")

        const maxAgeTokenInMS = 1000 * 60 * 60 * 24 * 7 // 7 days

        const token = jwt.sign({id: user.id, email: user.email}, env.JWT_SECRET, {expiresIn: maxAgeTokenInMS})
      
        return reply.setCookie("token", token, {path: "/", maxAge: maxAgeTokenInMS}).status(200).send({message: "logged successfully"})
    })
    
}