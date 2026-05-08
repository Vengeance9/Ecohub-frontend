"use server";

import { deletingVote, isUserLiked, voting } from "@/services/voting.services";

// export const voting = async (ideaId: string, type: string) => {
//   const vote = await axiosClient.httpPost(`/voting/vote/${ideaId}`, { type });
//   return vote;
// };

// export const deletingVote = async (ideaId: string) => {
//   const vote = await axiosClient.httpDelete(`/voting/deleteVote/${ideaId}`);
//   return vote;
// };

export const votingAction = async (ideaId: string, type: string) => {
  const result = await voting(ideaId, type);
  return result;
};

export const deletingVoteAction = async (ideaId: string) => {
  const result = await deletingVote(ideaId);
  return result;
};

export const isUserLikedAction = async (ideaId: string) => {
  const result = await isUserLiked(ideaId);
  return result;
};
