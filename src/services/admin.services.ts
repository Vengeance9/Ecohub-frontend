

import { axiosClient } from "@/lib/axios/httpClient";
import { catchAsyncFrontend } from "@/lib/shared/catchAsync";

export const viewMember = catchAsyncFrontend(
async(page:number,limit?:number,userRole?:string,userStatus?:string,userSortBy?:string,userSortOrder?:string,userSubscribed?:string)=>{
    const result = await axiosClient.httpGet(`/admin/view-members`,{
        params:{
            page,
            limit,
            userRole,
            userStatus,
            sortBy:userSortBy,
            sortOrder:userSortOrder,
            userSubscribed
        }
    });
    return result;
})

export const updateRole = catchAsyncFrontend(
async(userId:string)=>{
    const result = await axiosClient.httpPatch(`/admin/update-role/${userId}`,{userId});
    return result;
})

export const updateStatus = catchAsyncFrontend(
async(userId:string,status:string)=>{
    const result = await axiosClient.httpPatch(`/admin/update-status/${userId}`,{status});
    return result;
})

export const highlight = catchAsyncFrontend(
async(ideaId:string)=>{
    const result = await axiosClient.httpPatch(`/admin/highlight-idea/${ideaId}`,{ideaId});
    return result;
})