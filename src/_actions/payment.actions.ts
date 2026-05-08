"use server"

import { canViewPage, payForideas } from "@/services/payment.services"

export const payAction = async(ideaId:string,amount:number)=>{
    const result = await payForideas(ideaId,amount)
    return result
}

export const canViewPageAction = async(ideaId:string)=>{
    const result = await canViewPage(ideaId)
    return result
}