// "use client"
// //import { sendCommentToDb, viewComments } from "@/services/comment.services"
// import { useMutation, useQuery } from "@tanstack/react-query"
// import { useState } from "react"
// import { Button } from "../ui/button"
// import ViewReplies from "./ViewReplies"
// import { Input } from "../ui/input"
// import { sendCommentToDbAction, viewCommentsAction } from "@/_actions/comment.action"
// import { getUserInfoAction } from "@/_actions/auth.action"

// export default function ViewComments({ideaId}:{ideaId:string}){
//     const [showReplies,setShowReplies] = useState<string[]>([])
//     const [reply,setReply] = useState<string>("")
//     const [showReplyBox,setShowReplyBox] = useState("")
//     const {data,error,isLoading} = useQuery({
//         queryKey:["comments",ideaId],
//         queryFn:()=>viewCommentsAction(ideaId)
//     })

//     const {data:Me,isLoading:isMeLoading} = useQuery({
//         queryKey:["user"],
//         queryFn:()=>getUserInfoAction()
//     })

//     const {mutate:sendCommentFn,isPending:pendingComment} = useMutation({
//             mutationFn:(commentid:string)=>sendCommentToDbAction(commentid,reply)
//     })
        
//     const toggleReplies =(commentId:string)=>{
//         setShowReplies((prev)=>prev.includes(commentId)?prev.filter((id)=>id!==commentId):[...prev,commentId])
//     }

//     //console.log('THIS IS THE ME DATA',Me)

//     return (
//         <div >
//             <h1 className="text-3xl font-bold">Comments</h1>
//             <div>
//                 {
//                     isLoading? <div className="text-black text-6xl">Loading.....</div>:(<div>
//                         {
//                             data.data.map((comment:any)=>{
//                                 return (
//                                   <div key={comment.id}>
//                                     <div className="bg-gray-100 p-4 w-1/2 m-4">
//                                       <p className="text-small font-bold">
//                                         {Me.id===comment.user.id?"You":comment.user.name}
//                                       </p>
//                                       <p>{comment.comment}</p>
//                                       <p
//                                         className="text-xs text-gray-500"
//                                         onClick={() => setShowReplyBox(comment.id)}
//                                       >
//                                         Reply
//                                       </p>
//                                     </div>
//                                     {showReplyBox===comment.id && (
//                                       <div>
//                                         <Input
//                                           placeholder="Reply..."
//                                           className="mt-2"
//                                           value={reply}
//                                           onChange={(e) =>
//                                             setReply(e.target.value)
//                                           }
//                                         />
//                                         <div className="flex gap-2">
//                                           <button onClick={() =>
//                                               {
//                                                 sendCommentFn(comment.id) 
//                                               }
//                                             }
//                                             disabled={reply===""}
//                                           >
//                                             {pendingComment?<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>:<div className="text-xs">Send</div>}
//                                           </button>
//                                           <p onClick={() =>
//                                               {
//                                                 setShowReplyBox("")
//                                                 setReply("")
//                                               }
//                                             }
//                                             className="text-xs text-gray-700"
//                                           >
//                                             Cancel
//                                           </p>
//                                         </div>
//                                       </div>
//                                     )
                                    
//                                     }

//                                     <div>
//                                       {comment._count.replies > 0 && (
//                                         <div>
//                                           <div>
//                                             {showReplies.includes(
//                                               comment.id
//                                             ) ? (
//                                               <Button
//                                                 onClick={() =>
//                                                   toggleReplies(comment.id)
//                                                 }
//                                               >
//                                                 Hide Replies
//                                               </Button>
//                                             ) : (
//                                               <Button
//                                                 onClick={() =>
//                                                   toggleReplies(comment.id)
//                                                 }
//                                               >
//                                                 Show Replies
//                                               </Button>
//                                             )}
//                                             <div>
//                                               {showReplies.includes(
//                                                 comment.id
//                                               ) && (
//                                                 <ViewReplies
//                                                   parentId={comment.id}
//                                                   i={0}
//                                                   j={0}
//                                                 />
//                                               )}
//                                             </div>
//                                           </div>
//                                         </div>
//                                       )}
//                                     </div>
//                                   </div>
//                                 );   
                                            
//                             })
//                         }
//                     </div>
//                     )}
//             </div>
//         </div>
//     )
// }


"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ViewReplies from "./ViewReplies";
import { Input } from "../ui/input";
import {
  sendCommentToDbAction,
  viewCommentsAction,
} from "@/_actions/comment.action";
import { getUserInfoAction } from "@/_actions/auth.action";
import {
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Reply,
  Send,
  X,
  User,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";

export default function ViewComments({ ideaId,parentId }: { ideaId: string,parentId?:string }) {
  const [showReplies, setShowReplies] = useState<string[]>([]);
  const [reply, setReply] = useState<string>("");
  const [showReplyBox, setShowReplyBox] = useState("");
  

  const { data, error, isLoading } = useQuery({
    queryKey: ["comments", ideaId],
    queryFn: () => viewCommentsAction(ideaId),
    enabled: !!ideaId,
  });

  const { data: Me, isLoading: isMeLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfoAction(),
  });

  const { mutate: sendCommentFn, isPending: pendingComment,isSuccess } = useMutation({
    mutationFn: (commentid: string) => sendCommentToDbAction(ideaId, reply,commentid),
    onSuccess: () => {
      setReply("");
      setShowReplyBox("");
      
    },
  });

  const toggleReplies = (commentId: string) => {
    setShowReplies((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm ">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-bold text-gray-800">Comments</h2>
        </div>
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
          <span className="ml-2 text-gray-500">Loading comments...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-bold text-gray-800">Comments</h2>
        </div>
        <div className="text-center py-8 text-red-500 flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Failed to load comments
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mx-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-bold text-gray-800">
            Comments ({data?.data?.length || 0})
          </h2>
        </div>
      </div>

      {/* Comments List */}
      <div className="divide-y divide-gray-100">
        {!data?.data || data.data.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No comments yet.</p>
            <p className="text-gray-400 text-sm">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          data.data.map((comment: any, index: number) => {
            const isCurrentUser = Me?.id === comment.user?.id;
            return (
              <div
                key={comment.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Comment Container */}
                <div className="p-5">
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCurrentUser
                            ? "bg-gradient-to-br from-green-500 to-green-700"
                            : "bg-gradient-to-br from-gray-400 to-gray-600"
                        }`}
                      >
                        <span className="text-white text-sm font-bold">
                          {(isCurrentUser ? Me?.name : comment.user?.name)
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </span>
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-semibold text-gray-800">
                          {isCurrentUser
                            ? "You"
                            : comment.user?.name || "Anonymous"}
                        </p>
                        <span className="text-xs text-gray-400">
                          {formatDate(comment.createdAt)}
                        </span>
                        {isCurrentUser && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Author
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {comment.comment}
                      </p>

                      {/* Reply Button */}
                      <button
                        onClick={() =>
                          setShowReplyBox(
                            showReplyBox === comment.id ? "" : comment.id
                          )
                        }
                        className="flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-green-600 transition-colors"
                      >
                        <Reply className="w-3 h-3" />
                        Reply
                      </button>

                      {/* Reply Input Box */}
                      {showReplyBox === comment.id && (
                        <div className="mt-3 pl-0">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Write a reply..."
                              className="flex-1 text-sm"
                              value={reply}
                              onChange={(e) => setReply(e.target.value)}
                              autoFocus
                            />
                            <button
                              onClick={() => sendCommentFn(comment.id)}
                              disabled={pendingComment || reply === ""}
                              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                            >
                              {pendingComment ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : isSuccess ?(<Check className="w-3 h-3" />):(
                                <Send className="w-3 h-3" />
                              )}
                              <span className="text-xs">Send</span>
                            </button>
                            <button
                              onClick={() => {
                                setShowReplyBox("");
                                setReply("");
                              }}
                              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-1"
                            >
                              <X className="w-3 h-3" />
                              <span className="text-xs">Cancel</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Show/Hide Replies Button */}
                      {comment._count.replies > 0 && (
                        <div className="mt-3">
                          <button
                            onClick={() => toggleReplies(comment.id)}
                            className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium transition-colors"
                          >
                            {showReplies.includes(comment.id) ? (
                              <>
                                <ChevronUp className="w-3 h-3" />
                                Hide Replies ({comment._count.replies})
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3 h-3" />
                                Show Replies ({comment._count.replies})
                              </>
                            )}
                          </button>

                          {/* Replies Section */}
                          {showReplies.includes(comment.id) && (
                            <div className="mt-3">
                              <ViewReplies parentId={comment.id} ideaId={ideaId} i={0} j={0} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}