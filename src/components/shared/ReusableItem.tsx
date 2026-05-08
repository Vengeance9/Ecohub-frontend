// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { Eye, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";

// export default function ReusableItem({
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
//   const totalPages = meta ? Math.ceil(meta.total / limit) : 0;

//   let buttons = [];
//   let i = 1;
//   while (i <= totalPages) {
//     buttons.push(i);
//     i++;
//   }

//   // Show limited page numbers (max 5)
//   const getVisiblePages = () => {
//     if (totalPages <= 5) return buttons;
//     if (page <= 3) return buttons.slice(0, 5);
//     if (page >= totalPages - 2) return buttons.slice(totalPages - 5);
//     return buttons.slice(page - 3, page + 2);
//   };

//   const visiblePages = getVisiblePages();

//   return (
//     <div>
//       {/* Ideas Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
//         {data.map((idea: any, index: number) => (
//           <div
//             key={idea.id}
//             className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//             style={{ animationDelay: `${index * 0.05}s` }}
//           >
//             {/* Image Container */}
//             <div className="relative w-full h-48 overflow-hidden bg-gray-100">
//               <Image
//                 src={idea.photo}
//                 alt={idea.title}
//                 fill
//                 className="object-cover group-hover:scale-105 transition-transform duration-500"
//               />
//               {/* Price/Free Badge */}
//               <div
//                 className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-semibold ${
//                   idea.isPaid
//                     ? "bg-purple-600 text-white"
//                     : "bg-green-600 text-white"
//                 }`}
//               >
//                 {idea.isPaid ? (
//                   <span className="flex items-center gap-1">
//                     <DollarSign className="w-3 h-3" />
//                     {idea.price}
//                   </span>
//                 ) : (
//                   "Free"
//                 )}
//               </div>
//               {/* Category Badge */}
//               {idea.category?.name && (
//                 <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-xs text-white">
//                   {idea.category.name}
//                 </div>
//               )}
//             </div>

//             {/* Content */}
//             <div className="p-5">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
//                 {idea.title}
//               </h3>
//               <p className="text-gray-500 text-sm line-clamp-2 mb-4">
//                 {idea.description || "No description available"}
//               </p>

//               {/* Author Info */}
//               <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                 <div className="flex items-center gap-2">
//                   <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
//                     <span className="text-white text-xs font-bold">
//                       {idea.user?.name?.charAt(0) || "U"}
//                     </span>
//                   </div>
//                   <span className="text-xs text-gray-600 truncate max-w-[100px]">
//                     {idea.user?.name || "Anonymous"}
//                   </span>
//                 </div>
//                 <Link
//                   href={`/ideaDetails/${idea.id}`}
//                   className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium group-hover:translate-x-1 transition-transform"
//                 >
//                   <Eye className="w-4 h-4" />
//                   View
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex flex-wrap justify-center items-center gap-2 mt-8 pt-4 border-t border-gray-200">
//           <Button
//             onClick={() => setPage(page - 1)}
//             disabled={page <= 1}
//             className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//           >
//             <ChevronLeft className="w-4 h-4" />
//             Previous
//           </Button>

//           {visiblePages[0] > 1 && (
//             <>
//               <Button
//                 onClick={() => setPage(1)}
//                 className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all min-w-[40px]"
//               >
//                 1
//               </Button>
//               {visiblePages[0] > 2 && (
//                 <span className="text-gray-400 px-1">...</span>
//               )}
//             </>
//           )}

//           {visiblePages.map((button) => (
//             <Button
//               key={button}
//               onClick={() => setPage(button)}
//               className={`px-3 py-2 rounded-lg transition-all min-w-[40px] ${
//                 page === button
//                   ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
//                   : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               {button}
//             </Button>
//           ))}

//           {visiblePages[visiblePages.length - 1] < totalPages && (
//             <>
//               {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
//                 <span className="text-gray-400 px-1">...</span>
//               )}
//               <Button
//                 onClick={() => setPage(totalPages)}
//                 className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all min-w-[40px]"
//               >
//                 {totalPages}
//               </Button>
//             </>
//           )}

//           <Button
//             onClick={() => setPage(page + 1)}
//             disabled={page >= totalPages}
//             className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//           >
//             Next
//             <ChevronRight className="w-4 h-4" />
//           </Button>
//         </div>
//       )}

//       {/* Results Summary */}
//       {meta && (
//         <div className="text-center mt-4 text-sm text-gray-500">
//           Showing {(page - 1) * limit + 1} -{" "}
//           {Math.min(page * limit, meta.total)} of {meta.total} ideas
//         </div>
//       )}
//     </div>
//   );
// }


import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUserInfoAction } from "@/_actions/auth.action";

export default function ReusableItem({
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
  const totalPages = meta ? Math.ceil(meta.total / limit) : 0;

  const buttons: number[] = [];
  let i = 1;
  while (i <= totalPages) {
    buttons.push(i);
    i++;
  }

  const {data:user,isLoading}= useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfoAction(),
  })

  const getVisiblePages = () => {
    if (totalPages <= 5) return buttons;
    if (page <= 3) return buttons.slice(0, 5);
    if (page >= totalPages - 2) return buttons.slice(totalPages - 5);
    return buttons.slice(page - 3, page + 2);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-6">
      {/* Grid — 3 columns */}
      <div className="grid grid-cols-3 gap-6 pb-8">
        {data.map((idea: any) => (
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
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Price badge — top right only */}
              <div
                className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm ${
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
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col gap-2">
              {/* Category */}
              {idea.category?.name && (
                <span className="self-start px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-xs font-medium uppercase tracking-wide">
                  {idea.category.name}
                </span>
              )}

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors leading-snug">
                {idea.title}
              </h3>

              {/* Description — clamp to 3 lines */}
              <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed flex-1">
                {idea.description || "No description available"}
              </p>

              <div>
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
              </div>

              {/* Divider + footer */}
              <div className="border-t border-gray-100 pt-3 mt-1 flex items-center justify-between">
                {/* Author */}
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 px-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">
                      {idea.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 truncate max-w-[80px]">
                    {idea.user?.name || "Anonymous"}
                  </span>
                </div>

                {/* View link */}
                <Link
                  href={`/ideaDetails/paid/${idea.id}`}
                  className="flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}

      {/* Results summary */}
      {meta && (
        <p className="text-center mt-4 text-xs text-gray-400">
          Showing {(page - 1) * limit + 1}–{Math.min(page * limit, meta.total)}{" "}
          of {meta.total} ideas
        </p>
      )}
    </div>
  );
}
