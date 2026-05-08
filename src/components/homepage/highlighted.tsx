// "use client";
// import { getHighlightedIdeasAction } from "@/_actions/idea.action";
// //import { getHighlightedIdeas } from "@/services/ideas.services";
// import { useQuery } from "@tanstack/react-query";
// import Image from "next/image";
// import Link from "next/link";

// export default function Highlighted() {
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["ideas", "highlighted"],
//     queryFn: () => getHighlightedIdeasAction(),
//   });

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8">
//       <div>
//         {isLoading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="text-gray-500">Loading...</div>
//           </div>
//         ) : (
//           <div>
//             <div className="flex gap-6 overflow-x-auto pb-4">
//               {data.data.data.map((idea: any) => (
//                 <div
//                   key={idea.id}
//                   className="flex flex-col gap-3 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow min-w-[280px] flex-shrink-0 bg-white"
//                 >
//                   <div className="relative w-full h-48">
//                     <Image
//                       src={idea.photo}
//                       alt={idea.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <p className="text-gray-800 font-medium">{idea.title}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-6 text-center">
//               <Link
//                 href={`/`}
//                 className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 See More
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { getHighlightedIdeasAction } from "@/_actions/idea.action";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Sparkles } from "lucide-react";

export default function Highlighted() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["ideas", "highlighted"],
    queryFn: () => getHighlightedIdeasAction(),
  });

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col justify-center items-center py-16">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-green-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">
            Loading highlighted ideas...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <p className="text-red-600">
            Failed to load highlighted ideas. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!data?.data?.data || data.data.data.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="text-green-700 font-semibold text-sm">
            Featured Ideas
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Highlighted <span className="text-green-600">Innovations</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the most promising ideas that are shaping a better tomorrow
        </p>
      </div>

      {/* Ideas Grid */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.data.data.map((idea: any, index: number) => (
            <Link href={`/ideaDetails/paid/${idea.id}`} key={idea.id}>
              <div
                className="group bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={idea.photo}
                    alt={idea.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {idea.highlighted && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      Featured
                    </div>
                  )}
                  {idea.isPaid && (
                    <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                      Premium
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
                      {idea.category?.name || "Uncategorized"}
                    </span>
                  </div>

                  <h3 className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {idea.title}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {idea.description || "No description available"}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {idea.user?.name?.charAt(0) || "U"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">
                        {idea.user?.name || "Anonymous"}
                      </span>
                    </div>
                    <span className="text-green-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View Details
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See More Button */}
        
      </div>
    </div>
  );
}
