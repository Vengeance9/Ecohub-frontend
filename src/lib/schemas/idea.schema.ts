import {z} from "zod"

export const ideaSchema = z.object({
    title:z.string().min(5,"Title must be at least 5 characters").max(50,"Title must be less than 50 characters"),
    description:z.string().min(20,"Description must be at least 20 characters").max(500,"Description must be less than 500 characters"),
    problem:z.string().min(20,"Problem must be at least 20 characters").max(500,"Problem must be less than 500 characters"),
    solution:z.string().min(20,"Solution must be at least 20 characters").max(500,"Solution must be less than 500 characters"),
    categoryId:z.string().min(1,"A Category must be selected"),
    isPaid:z.boolean(),
    price:z.number().min(70,"Price must be at least 70").max(1000,"Price must be less than 1000").optional()
})