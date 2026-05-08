import { axiosClient } from "@/lib/axios/httpClient"
import { catchAsyncFrontend } from "@/lib/shared/catchAsync"

export const payForideas = catchAsyncFrontend(
async(ideaId:string,amount:number)=>{
    const response = await axiosClient.httpPost(`/payment/pay/${ideaId}`,{amount})
    return response
}
)
export const canViewPage = catchAsyncFrontend(
async(ideaId:string)=>{
    const response = await axiosClient.httpGet(`/ideas/canView/${ideaId}`)
    return response
})