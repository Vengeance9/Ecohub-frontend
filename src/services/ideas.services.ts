
import { axiosClient } from "@/lib/axios/httpClient";
import { catchAsyncFrontend } from "@/lib/shared/catchAsync";



export const getFilteredIdeas = catchAsyncFrontend(
async (category?:string,searchTerm?:string,page?:number,sortBy?:string,sortOrder?:string,where?:string,edited?:string,limit?:number) => {
    const result = await axiosClient.httpGet(`/ideas`,{
        params:{
            category:category ||undefined,
            searchTerm:searchTerm ||undefined,
            page:page ||undefined,
            sortBy:sortBy ||undefined,
            sortOrder:sortOrder ||undefined,
            where:where ||undefined,
            edited:edited ||undefined,
            limit:limit ||undefined
        }
    });
    return result;
})



export const getHighlightedIdeas = catchAsyncFrontend(
async()=>{
    const result = await axiosClient.httpGet(`/ideas?highlighted=true`);
    return result;
})

export const getIdeaById = catchAsyncFrontend(
async(ideaId:string)=>{
    const result = await axiosClient.httpGet(`/ideas/${ideaId}`);
    return result;
})
export const getIdeasByUserId = catchAsyncFrontend(
async(page?:number,sortBy?:string,sortOrder?:string,where?:string)=>{
    const result = await axiosClient.httpGet(`/ideas/user`,{
        params:{
            page:page ||undefined,
            sortBy:sortBy ||undefined,
            sortOrder:sortOrder ||undefined,
            where:where ||undefined
        }
    });
    return result;
})

export const getUserIdeaInfo = catchAsyncFrontend(
async()=>{
    const result = await axiosClient.httpGet(`/ideas/getUserIdeaInfo`);
    return result;
})

export const submitIdea = catchAsyncFrontend(
async(data:FormData)=>{
    const result = await axiosClient.httpPost(`/ideas/create-idea`,data);
    return result;
})

export const updateIdeas = catchAsyncFrontend(
async(data:FormData,ideaId:string)=>{
    const result = await axiosClient.httpPatch(
      `/ideas/update-idea/${ideaId}`,
      data
    );
    return result;
})

export const giveFeedback = catchAsyncFrontend(
 async(feedback:string,ideaId:string,status:string)=>{
    const result = await axiosClient.httpPost(`/admin/review-idea/${ideaId}`, {
      feedback,
      status
    });
    return result;
})

export const saveIdea = catchAsyncFrontend(
async(ideaId:string)=>{
    const result = await axiosClient.httpPost(`/ideas/save-idea`,{ideaId});
    return result;
})
export const isSaved = catchAsyncFrontend(
async(ideaId:string)=>{
    const result = await axiosClient.httpGet(`/ideas/isSaved/${ideaId}`);
    return result;
})

