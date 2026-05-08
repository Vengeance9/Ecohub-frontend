"use server"
import { viewReplies } from '@/services/comment.services';
import { viewComments } from '@/services/comment.services';
import { sendCommentToDb } from '@/services/comment.services';
export const sendCommentToDbAction = async (ideaId: string,comment: string, commentId?:string, ) => {
    const result = await sendCommentToDb(ideaId, comment,commentId);
    return result;
}

export const viewCommentsAction = async (ideaId: string) => {
    const result = await viewComments(ideaId);
    return result;
}

export const viewRepliesAction = async (parentId: string) => {
    const result = await viewReplies(parentId);
    return result;
}