// "use client"
// import { giveFeedbackAction } from "@/_actions/idea.action";
// import { useMutation } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";

// export default function AdminReview({id,data}:{id:string,data:any}) {
//     const [feedback, setFeedback] = useState("");
//     const [submittedFeedback, setSubmittedFeedback] = useState(false);
//     const [reviewStatus, setReviewStatus] = useState("");





//     const { mutate: sendReview, isPending: isRejectPending } = useMutation({
//       mutationFn: (status:string) => giveFeedbackAction(feedback as string, id as string,status),
//       onSuccess: () => setSubmittedFeedback(true),
//     });



//       let review = data?.data?.result?.status;
//       useEffect(() => {
//         if (review === "ACCEPTED" || review === "REJECTED") {
//           setSubmittedFeedback(true);
//           setReviewStatus(review);
//         }
//       }, [review]);


//       console.log('reviewStatus: ',reviewStatus)
//       console.log('review: ',review)




//     return (
//       <div>
//         <div>
//           {submittedFeedback && (
//             <div>
//               {review === "ACCEPTED" && <h1>This Idea is Approved</h1>}
//               {review === "REJECTED" && <h1>This Idea is Rejected</h1>}
//             </div>
//           )}

//           <div className={`${review === "ACCEPTED" ? "hidden" : ""}`}>


//             <Button onClick={() => setReviewStatus("approved")}>Approve</Button>


//             <Button
//               className={`${
//                 review === "REJECTED" ? "bg-red-200" : "bg-red-500"
//               }`}
//               onClick={() => setReviewStatus("rejected")}
//             >
//               Reject
//             </Button>



//             {reviewStatus === "approved" && (
//               <Button onClick={() => sendReview("APPROVED")}>Confirm</Button>
//             )}
//             {reviewStatus === "rejected" && !submittedFeedback && (
//               <div>
//                 <Textarea
//                   placeholder="Reason for rejection"
//                   value={feedback}
//                   onChange={(e) => setFeedback(e.target.value)}
//                 />
//                 <Button onClick={() => sendReview("REJECTED")}>Submit</Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
// }


"use client";
import { giveFeedbackAction } from "@/_actions/idea.action";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminReview({ id, data }: { id: string; data: any }) {
  const [feedback, setFeedback] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [reviewStatus, setReviewStatus] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const { mutate: sendReview, isPending: isRejectPending,isSuccess:sendReviewSuccess } = useMutation({
    mutationFn: (status: string) =>
    giveFeedbackAction(feedback as string, id as string, status),
    onSuccess: () => setSubmittedFeedback(true),
  });

  let review = data?.data?.result?.status;
  useEffect(() => {
    if (review === "ACCEPTED" || review === "REJECTED") {
      setSubmittedFeedback(true);
      setReviewStatus(review);
    }
  }, [review]);
  //console.log("FRONTEND RECEIVED:", JSON.stringify(data.data.result.feedback[0]));
  
      const raw = data?.data?.result.feedback;

      let cleanFeedback = raw;

      try {
        cleanFeedback = JSON.parse(raw);
      } catch {}

     // cleanFeedback = cleanFeedback.replace(/\\n/g, "\n"); 

  


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Status Badge Section */}
      {submittedFeedback && (
        <div className="mb-6">
          {review === "ACCEPTED" && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-4">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h1 className="text-green-700 font-semibold">
                This Idea is Approved
              </h1>
            </div>
          )}
          {review === "REJECTED" && (
            <div>
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-4">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <h1 className="text-red-700 font-semibold">
                  This Idea is Rejected
                </h1>
              </div>
              <div className="mt-4">
                <Button onClick={() => setShowFeedback(true)}>
                  Show feedback
                </Button>
                <Button onClick={() => setShowFeedback(false)}>
                  Hide feedback
                </Button>
                {showFeedback && (
                  <div className="mt-4 mb-4 p-4 border border-gray-500 rounded-lg">
                    <p className="whitespace-pre-line text-gray-600 text-sm">
                      {cleanFeedback.split('\n').map((line:string,i:any)=>(
                        <span key={i}>
                            {line}
                            <br/>
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Review Actions Section */}
      <div className={`${review === "ACCEPTED" ? "hidden" : ""}`}>
        <div className="space-y-4">
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => setReviewStatus("approved")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Approve
            </Button>

            <Button
              onClick={() => setReviewStatus("rejected")}
              className={`${
                review === "REJECTED"
                  ? "bg-gray-300 hover:bg-gray-400 text-gray-700"
                  : "bg-red-600 hover:bg-red-700 text-white"
              } px-6 py-2 rounded-lg transition-colors duration-200`}
            >
              <svg
                className="w-4 h-4 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Reject
            </Button>
          </div>

          {/* Confirm Approval */}
          {reviewStatus === "approved" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-yellow-800 text-sm mb-3">
                Are you sure you want to approve this idea?
              </p>
              <Button
                onClick={() => sendReview("APPROVED")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                {isRejectPending ? "Approving..." :sendReviewSuccess ? "Approved" : "Approve"}
              </Button>
              <Button
                onClick={() => setReviewStatus("")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg ml-5"
              >
                Cancel
              </Button>
            </div>
          )}

          {/* Rejection Form */}
          {reviewStatus === "rejected" && !submittedFeedback && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 space-y-4">
              <label className="block text-red-800 font-medium text-sm">
                Rejection Feedback
              </label>
              <Textarea
                placeholder="e.g., Lacks feasibility study, Incomplete information, etc."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border-red-300 focus:border-red-500 focus:ring-red-500 rounded-lg"
                rows={3}
              />
              <Button
                onClick={() => sendReview("REJECTED")}
                disabled={isRejectPending}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {isRejectPending ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4 inline mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Rejection"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}