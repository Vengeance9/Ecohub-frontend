// "use client"
// import { getUserInfoAction } from "@/_actions/auth.action";
// import { sendCommentToDbAction } from "@/_actions/comment.action";
// import { getIdeaByIdAction } from "@/_actions/idea.action";
// import { deletingVoteAction, isUserLikedAction, votingAction } from "@/_actions/voting.action";
// import ViewComments from "@/components/homepage/ViewComments";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// // import { sendCommentToDb } from "@/services/comment.services";
// // import { getIdeaById } from "@/services/ideas.services";
// // import { deletingVote, voting } from "@/services/voting.services";
// import { useMutation, useQuery } from "@tanstack/react-query";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Ideadetails(){
//     const {id} = useParams()
    
//     const [vote,setVote]=useState('')
//     const [comment,setComment]=useState('')

    
//     const {data,error,isLoading} = useQuery({
//           queryKey:["idea",id],
//           queryFn:()=>getIdeaByIdAction(id as string)
//       })
//     // const {data:Me ,isLoading:isMeLoading} = useQuery({
//     //     queryKey:["user"],
//     //     queryFn:()=>getUserInfoAction()
//     // })
      
//   const {mutate:sendComment,isPending:pendingComment}= useMutation({
//         mutationFn: () => sendCommentToDbAction(id as string,comment as string,),
//       });
  

//   const {mutate:sendVote,isPending:pendingVote}= useMutation({
//       mutationFn:(voteType:string)=> votingAction(id as string,voteType),
//       onSuccess:(_,voteType)=>setVote(voteType)
//     })

//   const {mutate:deleteVote,isPending:pendingDeleteVote}= useMutation({
//     mutationFn:()=> deletingVoteAction(id as string),
//     onSuccess:()=>setVote('')
//   })

//   const {data:isLiked,isLoading:isLikedLoading}= useQuery({
//     queryKey:["isLiked",id],
//     queryFn:()=>isUserLikedAction(id as string)
//   })

//   //if(isMeLoading)return <div>Loading...</div>

//   useEffect(()=>{
//     if(isLiked)setVote(isLiked?.data?.type)
//   },[isLiked])

//   console.log('THIS IS THE VOTE',vote)


  




//     return (
//       <div>
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : (
//           <div>
//             <section className="header">
//               <img
//                 src={data.data.result.photo}
//                 alt=""
//                 className="w-1/2 h-100"
//               />
//               <h1>{data.data.result.title}</h1>
//               <p>
//                 <span>Category:</span>
//                 {data.data.result.category.name}
//               </p>
//               <p>
//                 <span>Author:</span>
//                 {data.data.result.user.name}
//               </p>

//               <p>{data.data.result.createdAt.toLocaleString().split("T")[0]}</p>
//               <p>{data.data.result.isPaid ? "Paid" : "Free"}</p>
//             </section>
//             <section className="body">
//               <p>{data.data.result.problem}</p>
//               <p>{data.data.result.solution}</p>
//               <p>{data.data.result.description}</p>
//             </section>
//             <section className="flex gap-3">
//               <div>
//                 {pendingVote ? (
//                   <div>Voting...</div>
//                 ) : (
//                   <Button className={`px-3 py-2 ${ vote === "UPVOTE" ? "bg-green-400" : "" }`}
//                     onClick={() => { vote === "UPVOTE" ?( deleteVote()) : (sendVote("UPVOTE"));
//                     }}
//                   >
//                     Upvote {vote === "UPVOTE" ? "🔼" : ""}
//                   </Button>
//                 )}
//               </div>

//               <Button
//                 className={`px-3 py-2 ${
//                   vote === "DOWNVOTE" ? "bg-green-400" : "bg-white text-black border border-black"
//                 }`}
//                 onClick={() => {vote==='DOWNVOTE'?(deleteVote()):(sendVote("DOWNVOTE"))}}
//               >
//                 Downvote {vote === "DOWNVOTE" ? "🔽" : ""}
//               </Button>
//             </section>
//             <section>
//               <p>Comment</p>
//               <Input
//                 placeholder="Write a comment"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//               <div>
//                 {pendingComment ? (
//                   <div>Commenting...</div>
//                 ) : (
//                   <Button className={"px-3 py-2"} onClick={() => sendComment()}>
//                     Send
//                   </Button>
//                 )}
//               </div>

//               <div>
//                 <ViewComments ideaId={id as string} />
//               </div>
//             </section>
//           </div>
//         )}
//       </div>
//     );
// }


"use client";
import { getUserInfoAction } from "@/_actions/auth.action";
import { sendCommentToDbAction } from "@/_actions/comment.action";
import { getIdeaByIdAction, isSavedAction, saveIdeaAction } from "@/_actions/idea.action";
import {
  deletingVoteAction,
  isUserLikedAction,
  votingAction,
} from "@/_actions/voting.action";
import ViewComments from "@/components/shared/ViewComments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Send,
  Calendar,
  User,
  Tag,
  DollarSign,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Bookmark,
  Check,
} from "lucide-react";
import Link from "next/link";
import { canViewPageAction } from "@/_actions/payment.actions";

export default function Ideadetails() {
  const { id } = useParams();

  const [vote, setVote] = useState("");
  const [comment, setComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  

    const { data: canView, isLoading: isCanViewLoading } = useQuery({
    queryKey: ["canView", id],
    queryFn: () => canViewPageAction(id as string),
    staleTime:0,
    refetchOnMount:true
  });





  const { data, error, isLoading } = useQuery({
    queryKey: ["idea", id],
    queryFn: () => getIdeaByIdAction(id as string),
  });
  const { data: Me, isLoading: isMeLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfoAction(),
  })
  const queryClient = useQueryClient();

  const { mutate: sendComment, isPending: pendingComment } = useMutation({
    mutationFn: () => sendCommentToDbAction(id as string, comment as string),
    onSuccess: () => {setComment("");queryClient.invalidateQueries({ queryKey: ["comments", id as string] })}
  });

  const { mutate: sendVote, isPending: pendingVote } = useMutation({
    mutationFn: (voteType: string) => votingAction(id as string, voteType),
    onSuccess: (_, voteType) => setVote(voteType),
  });

  const { mutate: deleteVote, isPending: pendingDeleteVote } = useMutation({
    mutationFn: () => deletingVoteAction(id as string),
    onSuccess: () => setVote(""),
  });

  const { data: isLiked, isLoading: isLikedLoading } = useQuery({
    queryKey: ["isLiked", id],
    queryFn: () => isUserLikedAction(id as string),
  });

  const {mutate:saveIdea,isPending:pendingSave}=useMutation({
    mutationFn:()=>saveIdeaAction(id as string),
    onSuccess:()=>setIsSaved(true)
  })

   const { data: Saved, isLoading: isSavedLoading } = useQuery({
     queryKey: ["isSaved", id],
     queryFn: () => isSavedAction(id as string),
   });

   console.log('Saved',Saved)

   useEffect(()=>{
    if(Saved){
      setIsSaved(Saved?.data)
    }
   },[id,Saved])

   console.log('isSaved',isSaved)

  useEffect(() => {
    if (isLiked) setVote(isLiked?.data?.type);
  }, [isLiked]);

    useEffect(() => {
      if (commentSuccess) {
        setComment("");
        const timer = setTimeout(() => {
          setCommentSuccess(false);
        }, 3000);

        return () => {
          clearTimeout(timer);
        };
      }
    }, [commentSuccess]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading idea details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Error Loading Idea
          </h2>
          <p className="text-gray-600">
            Could not load the idea details. Please try again.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  

  const idea = data?.data?.result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link
          href="/AllIdeas"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Ideas
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative w-full h-96 bg-gray-100">
            <img
              src={idea?.photo}
              alt={idea?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* Price Badge */}
            <div
              className={`absolute top-4 right-4 px-3 py-1 rounded-br-lg text-sm font-semibold ${
                idea?.isPaid
                  ? "bg-purple-600 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {idea?.isPaid ? (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {idea?.price}
                </span>
              ) : (
                "Free"
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {idea?.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">
                  By {idea?.user?.name || "Anonymous"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(idea?.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Tag className="w-4 h-4" />
                <span className="text-sm px-2 py-1 bg-gray-100 rounded-md">
                  {idea?.category?.name}
                </span>
              </div>

              <button
                onClick={() => saveIdea()}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isSaved
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                <Bookmark
                  className={`w-4 h-4 transition-all ${
                    isSaved ? "fill-white" : ""
                  }`}
                />
                {isSaved ? "Saved" : "Save"}
              </button>
            </div>

            {/* Voting Section */}
            <div className="flex gap-3 mb-8 p-4 bg-gray-50 rounded-xl">
              <Button
                disabled={pendingVote}
                onClick={() =>
                  vote === "UPVOTE" ? deleteVote() : sendVote("UPVOTE")
                }
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
                  vote === "UPVOTE"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-green-50"
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                Upvote
              </Button>
              <Button
                disabled={pendingVote}
                onClick={() =>
                  vote === "DOWNVOTE" ? deleteVote() : sendVote("DOWNVOTE")
                }
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
                  vote === "DOWNVOTE"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-red-50"
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                Downvote
              </Button>
            </div>

            {/* Problem & Solution */}
            <div className="space-y-6 mb-8">
              <div className="">
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                  Problem Statement
                </h2>
                <p className="text-gray-700 leading-relaxed ">
                  {idea?.problem}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                  Proposed Solution
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {idea?.solution}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                  Detailed Description
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {idea?.description}
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-200 pt-8">
              {/* <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">Comments</h2>
              </div> */}

              {/* Add Comment */}
              <div className="mb-8">
                <div className="flex gap-3 mt-8">
                  <Input
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => sendComment()}
                    disabled={pendingComment || !comment.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {pendingComment ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : commentSuccess ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* View Comments Component */}
              <ViewComments ideaId={id as string} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}