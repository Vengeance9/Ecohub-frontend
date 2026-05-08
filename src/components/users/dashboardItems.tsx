// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { Button } from "../ui/button";
// import Pagination from "./shared/pagination";

// export default function DashboardItem({

//   data,
//   meta,
//   page,
//   setPage,
// }: {

//   data: any;
//   meta?: any;
//   page: number;
//   setPage: (page: number) => void;
// }) {
//   const limit = 10;
//   const totalPages = data ? Math.ceil(meta.total / limit) : 0;
//   let buttons = [];
//   let i = 1;
//   while (i <= totalPages) {
//     buttons.push(i);
//     i++;
//   }
//   //console.log("DATA IN REUSABLE ITEM", data);
//   return (
//     <div>
//       <div className="grid grid-cols-3 gap-6  pb-4">
//         {data.map((idea: any) => (
//           <div
//             key={idea.id}
//             className="flex flex-col gap-3 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow min-w-[280px] flex-shrink-0 bg-white"
//           >
//             <div className="relative w-full h-48">
//               <Image
//                 src={idea.photo}
//                 alt={idea.title}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div className="p-4">
//               <p className="text-gray-800 font-medium">{idea.title}</p>
//               <div className="inline-flex gap-2 border border-gray-500 rounded-lg p-2">
//                 <p>{idea.upvotes} upvotes |</p>
//                 <p>{idea.downvotes} downvotes</p>
//               </div>
//               <p>{idea._count.comments} comments</p>
//               <p>{idea.status}</p>
//               <p className="text-gray-600">{idea.isPaid ? "Paid" : "Free"}</p>
//             </div>
//             <div>
//               <Link
//                 href={`/ideaDetails/${idea.id}`}
//                 className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 See Details
//               </Link>
//               {(idea.status === "UNDERREVIEW" || idea.status === "REJECTED" || idea.status === "DRAFT") &&<Link
//                 href={`/editIdeas/${idea.id}`}
//                 className="inline-block mt-4 ml-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 Edit Details
//               </Link>}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div>

//         <Pagination data={data} meta={meta} page={page} setPage={setPage} />
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import Pagination from "../shared/pagination";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  DollarSign,
  Eye,
  Pencil,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";

export default function DashboardItem({
  data,
  meta,
  page,
  setPage,
}: {
  data: any;
  meta?: any;
  page: number;
  setPage: (page: number) => void;
}) {
  const limit = 10;
  const totalPages = data ? Math.ceil(meta.total / limit) : 0;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "APPROVED":
        return {
          color: "text-emerald-700",
          bg: "bg-gray-500",
          dot: "bg-emerald-500",
          label: "Approved",
        };
      case "REJECTED":
        return {
          color: "text-red-700",
          bg: "bg-red-50 border-red-200",
          dot: "bg-red-500",
          label: "Rejected",
        };
      case "UNDERREVIEW":
        return {
          color: "text-blue-700",
          bg: "bg-blue-50 border-blue-200",
          dot: "bg-blue-500",
          label: "Under Review",
        };
      case "DRAFT":
        return {
          color: "text-gray-600",
          bg: "bg-gray-50 border-gray-200",
          dot: "bg-gray-400",
          label: "Draft",
        };
      default:
        return {
          color: "text-amber-700",
          bg: "bg-amber-50 border-amber-200",
          dot: "bg-amber-500",
          label: status,
        };
    }
  };

  const canEdit = (status: string) =>
    ["UNDERREVIEW", "REJECTED", "DRAFT"].includes(status);

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 pb-8">
        {data.map((idea: any) => {
          const statusConfig = getStatusConfig(idea.status);

          return (
            <div
              key={idea.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-48 bg-gray-100 flex-shrink-0">
                <Image
                  src={idea.photo}
                  alt={idea.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Badge row — sits between image and content */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                {/* Free/Paid — bottom left of image */}
                <div
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    idea.isPaid
                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {idea.isPaid ? (
                    <>
                      <DollarSign className="w-3 h-3" />
                      {idea.price || "Paid"}
                    </>
                  ) : (
                    "Free"
                  )}
                </div>

                {/* Status — bottom right of image */}
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusConfig.bg} ${statusConfig.color}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}
                  />
                  {statusConfig.label}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col gap-2">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors leading-snug">
                  {idea.title}
                </h3>

                {/* Stats */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-xs font-medium">
                    <ThumbsUp className="w-3 h-3" />
                    {idea.upvotes || 0}
                  </span>
                  <span className="flex items-center gap-1 bg-red-50 text-red-500 px-2 py-0.5 rounded-md text-xs font-medium">
                    <ThumbsDown className="w-3 h-3" />
                    {idea.downvotes || 0}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 text-xs">
                    <MessageCircle className="w-3 h-3" />
                    {idea._count?.comments || 0}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className={`px-4 pb-4 grid gap-2 ${
                  canEdit(idea.status) ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                <Link
                  href={`/ideaDetails/paid/${idea.id}`}
                  className="flex items-center justify-center gap-1.5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all text-sm font-medium shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Details
                </Link>

                {canEdit(idea.status) && (
                  <Link
                    href={`/users/editIdeas/${idea.id}`}
                    className="flex items-center justify-center gap-1.5 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Pagination data={data} meta={meta} page={page} setPage={setPage} />
    </div>
  );
}
