"use client";
//import { viewReplies } from "@/services/comment.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/button";
import { MessageCircle, ChevronDown, ChevronUp, User, X, Send } from "lucide-react";
import { sendCommentToDbAction, viewRepliesAction } from "@/_actions/comment.action";
import { IReplies, IReplyData } from "@/interfaces/comments.interface";




export default function ViewReplies({
  parentId,
  ideaId,
  i,
  j,
}: {
  parentId: string;
  ideaId: string;
  i: number;
  j: number;
}) {
  const [reply, setReply] = useState<string>("");
  const [showReplies, setShowReplies] = useState<string | null>(null);
  const [showReplyBox, setShowReplyBox] = useState("");
  const { data, isLoading } = useQuery<IReplyData>({
    queryKey: ["replies", parentId],
    queryFn: () => viewRepliesAction(parentId),
  });

    const {
      mutate: sendCommentFn,
      isPending: pendingComment,
      isSuccess,
    } = useMutation({
      mutationFn: (commentid: string) =>
        sendCommentToDbAction(ideaId, reply, commentid),
      onSuccess: () => {
        setReply("");
        setShowReplyBox("");
      },
    });

  if (!data) return null;

  return (
    <div className="ml-8 pl-4 border-l-2 border-green-200">
      {isLoading ? (
        <div className="flex items-center gap-2 text-gray-500 py-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
          <span className="text-sm">Loading replies...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {data.data.map((reply: IReplies, idx: number) => (
            <div
              key={reply.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-gray-800">
                      {reply.user.name}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(reply.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {reply.user.id === reply.parent.user.id ? (
                      <span className="text-gray-500">{reply.comment}</span>
                    ) : (
                      <>
                        <span className="text-green-600 font-medium">
                          @{reply.parent.user.name}
                        </span>
                        <span className="text-gray-500"> {reply.comment}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              {reply._count.replies > 0 && (
                <div className="mt-3 ml-11">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setShowReplies(showReplies === reply.id ? null : reply.id)
                    }
                    className="text-xs text-green-600 hover:text-green-700 hover:bg-green-50 px-2 py-1 h-auto"
                  >
                    {showReplies === reply.id ? (
                      <>
                        <ChevronUp className="w-3 h-3 mr-1" />
                        Hide Replies ({reply._count.replies})
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3 mr-1" />
                        Show Replies ({reply._count.replies})
                      </>
                    )}
                  </Button>

                  {showReplies === reply.id && (
                    <div className="mt-3">
                      <ViewReplies
                        parentId={reply.id}
                        ideaId={ideaId}
                        i={0}
                        j={0}
                      />
                    </div>
                  )}

                 
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
