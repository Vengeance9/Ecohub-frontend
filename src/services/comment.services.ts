
import { IReplyData } from "@/interfaces/comments.interface";
import { axiosClient } from "@/lib/axios/httpClient";
import { catchAsyncFrontend } from "@/lib/shared/catchAsync";

export const sendCommentToDb = catchAsyncFrontend(
async (ideaId: string, comment: string, parentId?: string) => {
    const result = await axiosClient.httpPost(`/comments/create-comment/${ideaId}`, {comment,parentId} );
    return result;
})

export const viewComments = catchAsyncFrontend(
async (ideaId: string) => {
    const result = await axiosClient.httpGet(`/comments/idea/${ideaId}`);
    return result;
}
)
export const viewReplies = catchAsyncFrontend(
async(parentId:string):Promise<IReplyData>=>{
    const result = await axiosClient.httpGet(`/comments/replies/${parentId}`)
    return result
})