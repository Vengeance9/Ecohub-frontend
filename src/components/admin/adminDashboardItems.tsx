// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import Pagination from "../shared/pagination";

// export default function AdminDashboardItem({
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
//               {/* <p>{idea._count.comments??0} comments</p> */}
//               <p>{idea.status}</p>
//               <p className="text-gray-600">{idea.isPaid ? "Paid" : "Free"}</p>
//             </div>
//             <div>
//               <Link
//                 href={`/adminIdeaDetails/${idea.id}`}
//                 className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 See Details
//               </Link>
              
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
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboardItem({
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
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "APPROVED":
        return {
          icon: CheckCircle,
          color: "text-emerald-700",
          bg: "bg-gray-600 ",
          dot: "bg-green-500",
          label: "Approved",
        };
      case "REJECTED":
        return {
          icon: XCircle,
          color: "text-white",
          bg: "bg-gray-600 ",
          dot: "bg-red-500",
          label: "Rejected",
        };
      case "PENDING":
        return {
          icon: Clock,
          color: "text-amber-700",
          bg: "bg-amber-50 border-amber-200",
          dot: "bg-amber-500",
          label: "Pending",
        };
      case "UNDERREVIEW":
        return {
          icon: AlertCircle,
          color: "text-blue-700",
          bg: "bg-blue-300 border-blue-200",
          dot: "bg-yellow-500",
          label: "Under Review",
        };
      default:
        return {
          icon: Clock,
          color: "text-gray-600",
          bg: "bg-gray-50 border-gray-200",
          dot: "bg-gray-400",
          label: status,
        };
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📭</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          No Ideas Found
        </h3>
        <p className="text-gray-400 text-sm">
          There are no ideas to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 pb-8">
        {data.map((idea: any) => {
          const statusConfig = getStatusConfig(idea.status);
          const StatusIcon = statusConfig.icon;

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
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Price — bottom left */}
                <div
                  className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    idea.isPaid
                      ? "bg-purple-600 text-white"
                      : "bg-emerald-500 text-white"
                  }`}
                >
                  {idea.isPaid ? (
                    <>
                      <DollarSign className="w-3 h-3" />
                      {idea.price}
                    </>
                  ) : (
                    "Free"
                  )}
                </div>

                {/* Status — bottom right */}
                <div
                  className={`absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-tl-lg rounded-br-lg text-xs font-semibold border ${statusConfig.bg} ${statusConfig.color}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${statusConfig.dot}`}
                  />
                  {statusConfig.label}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col gap-2">
                {idea.category?.name && (
                  <span className="self-start px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-xs font-medium uppercase tracking-wide">
                    {idea.category.name}
                  </span>
                )}

                <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors leading-snug">
                  {idea.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed flex-1">
                  {idea.description || "No description available"}
                </p>

                {/* Stats + Author */}
                <div className="border-t border-gray-100 pt-3 mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
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

                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 px-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {idea.user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 truncate max-w-[72px]">
                      {idea.user?.name || "Anonymous"}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="px-4 pb-4">
                <Link
                  href={`/admin/adminIdeaDetails/${idea.id}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                >
                  <Eye className="w-4 h-6" />
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {meta && meta.total > (meta.perPage || 10) && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          <Pagination data={data} meta={meta} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
}

