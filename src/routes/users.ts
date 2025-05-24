import { FastifyInstance } from "fastify"
import { string, z } from "zod"
import { db } from "../db/database"

export async function usersRoutes(app: FastifyInstance){
    app.get("/metrics/totalMeals/:id", async (req, reply)=>{
        const paramsSchema = z.object({
            id: string()
        })

        const {id: userId} = paramsSchema.parse(req.params)

        const [totalMeals] = await db('meals').where({"user_Id": userId}).count()

        return reply.status(200).send({totalMeals: totalMeals['count(*)']})
    })

    app.get("/metrics/totalMealsInDiet/:id", async (req, reply)=>{
        const paramsSchema = z.object({
            id: string()
        })

        const {id: userId} = paramsSchema.parse(req.params)

        const [totalMeals] = await db('meals').where({"user_Id": userId, 'is_in_diet': true}).count()

        return reply.status(200).send({totalMealsInDiet: totalMeals['count(*)']})
    })

    app.get("/metrics/totalMealsOutDiet/:id", async (req, reply)=>{
        const paramsSchema = z.object({
            id: string()
        })

        const {id: userId} = paramsSchema.parse(req.params)

        const [totalMeals] = await db('meals').where({"user_Id": userId, 'is_in_diet': false}).count()

        return reply.status(200).send({totalMealsOutDiet: totalMeals['count(*)']})
    })

    app.get("/metrics/betterSequence/:id", async (req, reply)=>{
        const paramsSchema = z.object({
            id: string()
        })

        const {id: userId} = paramsSchema.parse(req.params)

        const mealsSorted = await db('meals').where({"user_Id": userId}).select("*").orderBy('date', 'desc')

        let betterSequence = 0
        let currSequence = 0

        mealsSorted.forEach(meal=>{
            if (!meal.is_in_diet){
                currSequence = 0 
            } else{
                currSequence+=1
            }
            if(currSequence>betterSequence) betterSequence = currSequence
        })

        return reply.status(200).send({betterSequenceInDays: betterSequence})
    })

    
}