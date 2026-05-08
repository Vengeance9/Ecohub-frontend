import { IIsUserLikedResponse } from "@/interfaces/user.interface"
import { axiosClient } from "@/lib/axios/httpClient"
import { catchAsyncFrontend } from "@/lib/shared/catchAsync"




export const voting = catchAsyncFrontend(async(ideaId:string,type:string)=>{
    const vote = await axiosClient.httpPost(`/voting/vote/${ideaId}`,{type})
    return vote
})

export const deletingVote = catchAsyncFrontend(
async(ideaId:string)=>{
    const vote = await axiosClient.httpDelete(`/voting/deleteVote/${ideaId}`);
    return vote
})

export const isUserLiked = catchAsyncFrontend(
async(ideaId:string):Promise<IIsUserLikedResponse | null>=>{
    const vote = await axiosClient.httpGet(`/voting/user/Liked/${ideaId}`)
    return vote
})