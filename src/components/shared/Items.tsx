// "use client";
// import { useState } from "react";
// import Category from "./category";
// import SearchBar from "./searchbar";
// import { useQuery } from "@tanstack/react-query";
// import Image from "next/image";
// import Link from "next/link";
// import { getFilteredIdeasAction } from "@/_actions/idea.action";
// import ReusableItem from "./ReusableItem";
// import { AlertCircle, Loader2 } from "lucide-react";

// export default function Items() {
//   const [category, setCategory] = useState("");
//   const [search, setSearch] = useState("");
//   const [searchedItem, setSearchedItem] = useState(null);
//   const [page, setPage] = useState(1);

//   const { data, error, isLoading } = useQuery({
//     queryKey: ["ideas", category, search, page],
//     queryFn: () => getFilteredIdeasAction(category, search, page),
//   });

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8">
//       <div className="flex flex-col gap-6">
//         <SearchBar search={search} setSearch={setSearch} />
//         <Category category={category} setCategory={setCategory} />
//       </div>

//       <div className="mt-8">
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
//             <p className="text-gray-600 font-medium">Loading ideas...</p>
//             <p className="text-gray-400 text-sm">
//               Please wait while we fetch the latest ideas
//             </p>
//           </div>
//         ) : error ? (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
//             <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold text-red-800 mb-2">
//               Failed to Load Ideas
//             </h3>
//             <p className="text-red-600 mb-4">
//               {(error as Error)?.message || "Something went wrong"}
//             </p>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : (
//           <div>
//             {!data?.data?.data || data.data.data.length === 0 ? (
//               <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
//                 <div className="text-6xl mb-4">🔍</div>
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                   No Ideas Found
//                 </h3>
//                 <p className="text-gray-500 mb-6">
//                   {category || search
//                     ? "No ideas match your current filters. Try adjusting your search or category."
//                     : "Be the first to share an idea!"}
//                 </p>
//                 {(category || search) && (
//                   <button
//                     onClick={() => {
//                       setCategory("");
//                       setSearch("");
//                     }}
//                     className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                   >
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <ReusableItem
//                 data={data.data.data}
//                 meta={data.data.meta}
//                 page={page}
//                 setPage={setPage}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import Category from "./category";
import SearchBar from "./searchbar";
import { useQuery } from "@tanstack/react-query";
import { getFilteredIdeasAction } from "@/_actions/idea.action";
import ReusableItem from "./ReusableItem";
import {
  AlertCircle,
  Loader2,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Items() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const status = "APPROVED"
  const edited = "true"
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, error, isLoading } = useQuery({
    queryKey: ["ideas", category, search, page, sortBy, sortOrder,status,edited],
    queryFn: () => getFilteredIdeasAction(category, search, page,sortBy, sortOrder,status,edited),
  });

  const hasResults = data?.data?.data && data.data.data.length > 0;
  const hasFilters = category || search;




  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Idea Hub
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Explore Ideas
        </h1>
        <p className="text-gray-500 mt-2 text-base">
          Browse, filter, and discover ideas from the community.
        </p>
      </div>

      {/* Search + Filter Panel */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Filter & Search
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <SearchBar search={search} setSearch={setSearch} />
          <div className="border-t border-gray-100 pt-5">
            <Category category={category} setCategory={setCategory} />
          </div>
        </div>

        {/* Active filter summary */}
        {hasFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Filtering by:{" "}
              {/* {category && (
                <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-xs font-medium mr-1">
                  {category}
                </span>
              )} */}
              {search && (
                <span className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                  "{search}"
                </span>
              )}
            </p>
            <button
              onClick={() => {
                setCategory("");
                setSearch("");
              }}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-4 border-emerald-100" />
              <Loader2 className="w-14 h-14 text-emerald-500 animate-spin absolute inset-0" />
            </div>
            <p className="text-gray-600 font-medium mt-2">Fetching ideas...</p>
            <p className="text-gray-400 text-sm">Just a moment</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-10 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-1">
              Something went wrong
            </h3>
            <p className="text-red-500 text-sm mb-5">
              {(error as Error)?.message || "Failed to load ideas"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        ) : !hasResults ? (
          <div className="border border-dashed border-gray-200 rounded-2xl p-16 text-center bg-gray-50/50">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No ideas found
            </h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto mb-6">
              {hasFilters
                ? "Nothing matches your current filters. Try a different search or category."
                : "No ideas have been submitted yet. Be the first!"}
            </p>
            {hasFilters && (
              <button
                onClick={() => {
                  setCategory("");
                  setSearch("");
                }}
                className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="mt-5">
            {/* Results count */}
            <div className="flex items-center justify-between mb-5 mt-5">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {data.data.data.length}
                </span>{" "}
                idea{data.data.data.length !== 1 ? "s" : ""}
                {hasFilters && " matching your filters"}
              </p>
            </div>

            <ReusableItem
              data={data.data.data}
              meta={data.data.meta}
              page={page}
              setPage={setPage}
            />

            <div className="flex items-center justify-center mt-5">
              <Link href="/AllIdeas">
                <Button>Show all</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
