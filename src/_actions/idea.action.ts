"use server";
import {
  getFilteredIdeas,
  getHighlightedIdeas,
  getIdeaById,
  getIdeasByUserId,
  getUserIdeaInfo,
  giveFeedback,
  isSaved,
  saveIdea,
  submitIdea,
  updateIdeas,
} from "@/services/ideas.services";


export const getFilteredIdeasAction = async (
  category: string,
  searchTerm: string,
  page?: number,
  sortBy?: string,
  sortOrder?: string,
  status?: string,
  edited?:string,
  limit?:number
) => {
  const result = await getFilteredIdeas(
    category,
    searchTerm,
    page,
    sortBy,
    sortOrder,
    status,
    edited,
    limit
  );
  return result;
};

export const getHighlightedIdeasAction = async () => {
  const result = await getHighlightedIdeas();
  return result;
};

export const getIdeaByIdAction = async (ideaId: string) => {
  const result = await getIdeaById(ideaId);
  return result;
};

export const getIdeasByUserIdAction = async (page?:number,sortBy?:string,sortOrder?:string,status?:string) => {
  const result = await getIdeasByUserId(page,sortBy,sortOrder,status);
  return result;
};

export const getUserIdeaInfoAction = async () => {
  const result = await getUserIdeaInfo();
  return result;
};

export const submitIdeaAction = async(data:FormData)=>{
    const result = await submitIdea(data)
    return result
}

export const updateIdeasAction = async(data:FormData,ideaId:string)=>{
  const result = await updateIdeas(data,ideaId)
  return result
}

export const giveFeedbackAction = async(feedback:string,ideaId:string,status:string)=>{
  const result = await giveFeedback(feedback,ideaId,status)
  return result
}

export const saveIdeaAction = async(ideaId:string)=>{
  const result = await saveIdea(ideaId)
  return result
}

export const isSavedAction = async(ideaId:string)=>{
  const result = await isSaved(ideaId)
  return result
}