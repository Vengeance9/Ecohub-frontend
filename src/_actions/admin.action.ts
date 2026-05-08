"use server";
import { highlight, updateRole, updateStatus, viewMember } from "./../services/admin.services";

export const viewMemberAction = async (page:number,limit?:number,userRole?:string,userStatus?:string,userSortBy?:string,userSortOrder?:string,userSubscribed?:string) => {
  const result = await viewMember(page,limit,userRole,userStatus,userSortBy,userSortOrder,userSubscribed);
  return result;
};

export const updateRoleAction = async(userId:string)=>{
    const result = await updateRole(userId)
    return result
}

export const updateStatusAction = async(userId:string,status:string)=>{
    const result = await updateStatus(userId,status)
    return result
}

export const highlightAction = async(ideaId:string)=>{
    const result = await highlight(ideaId)
    return result
}
