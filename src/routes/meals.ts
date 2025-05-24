import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middlewares/auth";
import { z } from "zod";
import { db } from "../db/database";

export async function mealsRoutes(app: FastifyInstance) {
    app.addHook('preHandler', authMiddleware);
    

    app.post('/', async (req, reply)=>{
        const registerBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            date: z.string(),
            isInDiet: z.boolean()
        })
               
        const parseResult = registerBodySchema.safeParse(req.body)

        if(!parseResult.success) return reply.status(409).send({message: "request body is incomplete!"})

        const {name, description, date, isInDiet} = parseResult.data

        const {id: userId} = req.user

        await db('meals').insert({
            name, description, date: new Date(date), is_in_diet: isInDiet, user_id: userId
        })
        
        return reply.status(201).send({message: "meal registered successfully!"})
    })

    app.put('/:id', async (req, reply)=>{
         const registerBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            date: z.string(),
            isInDiet: z.boolean()
        })
        
        const paramsSchema = z.object({
            id: z.string(),
        })

        const bodyParseResult = registerBodySchema.safeParse(req.body)

        if(!bodyParseResult.success) return reply.status(409).send({message: "request body is incomplete!"})

        const {id: mealId} = paramsSchema.parse(req.params)
        const {name, description, date, isInDiet} = bodyParseResult.data
        const {id: userId} = req.user
        
        const modifiedResources = await db('meals')
        .where({'id': mealId, 'user_id': userId})
        .update({name, description, date: new Date(date), 'is_in_diet': isInDiet})
        
        if(!modifiedResources) return reply.status(404).send({message: "meal not found!"})

        return reply.status(200).send({message: "meal updated!"})
    })


    app.get("/", async (req, reply)=>{
        const {id: userId} = req.user

        const meals = await db('meals').where('user_id', userId).select("*").orderBy("date", 'desc')

        return reply.send(meals)
    })

    app.get("/:id", async (req, reply)=>{
        const paramsSchema = z.object({
            id: z.string(),
        })
               
        const {id: mealId} = paramsSchema.parse(req.params)
        
        const {id: userId} = req.user

        const meal = await db('meals').where({'id': mealId, 'user_id': userId}).select("*").first()
        
        if(!meal) return reply.status(404).send({message: "meal not found"})
        
        return reply.status(200).send(meal)
    })

    app.delete('/:id', async (req, reply)=>{
        const paramsSchema = z.object({
            id: z.string(),
        })
               
        const {id: mealId} = paramsSchema.parse(req.params)
        
        const {id: userId} = req.user

        const deletedResources = await db('meals').where({'id': mealId, 'user_id': userId}).delete()
    
        if(!deletedResources) return reply.status(404).send({message: "meal not found!"})
            
        return reply.status(200).send({message: "meal deleted!"})
    })
}