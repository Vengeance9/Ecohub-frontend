// "use client";
// import { useState } from "react";

// //import { getFilteredIdeas } from "@/services/ideas.services";
// import { useQuery } from "@tanstack/react-query";
// import Image from "next/image";
// import Link from "next/link";
// import SearchBar from "@/components/homepage/shared/searchbar";
// import Category from "@/components/homepage/shared/category";
// import { Button } from "@base-ui/react/button";
// import { getFilteredIdeasAction } from "@/_actions/idea.action";

// export default function AllIdeas() {
//   const [category, setCategory] = useState("");
//   const [search, setSearch] = useState("");
//   const [searchedItem, setSearchedItem] = useState(null);
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const { data, error, isLoading } = useQuery({
//     queryKey: ["ideas", category, search, page, sortBy, sortOrder],
//     queryFn: () =>
//       getFilteredIdeasAction(category, search, page, sortBy, sortOrder),
//   });

//   const totalPages = data ? Math.ceil(data.data.meta.total / limit) : 0;
//   let buttons = [];
//   let i = 1;
//   while (i <= totalPages) {
//     buttons.push(i);
//     i++;
//   }
//   const toggleOldest = () => {
//     setSortBy(() => (sortBy === "createdAt" ? "createdAt" : "createdAt"));
//     setSortOrder(() => (sortOrder === "asc" ? "desc" : "asc"));
//   };

//   const toggleNewest = () => {
//     setSortBy(() => (sortBy === "createdAt" ? "createdAt" : "createdAt"));
//     setSortOrder(() => (sortOrder === "desc" ? "asc" : "desc"));
//   };
//   const toggleVote = () => {
//     setSortBy(() => (sortBy === "vote" ? "" : "vote"));
//     setSortOrder(() => (sortOrder === "desc" ? "" : "desc"));
//   };
//   const toggleComment = () => {
//     setSortBy(() => (sortBy === "comments" ? "" : "comments"));
//     setSortOrder(() => (sortOrder === "desc" ? "" : "desc"));
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8">
//       <div className="flex flex-col gap-6">
//         <SearchBar search={search} setSearch={setSearch} />
//         <Category category={category} setCategory={setCategory} />
//         <div>
//           <h1>SorBy</h1>
//           <Button
//             onClick={() => {
//               toggleOldest();
//             }}
//             className={`mr-2 p-2 border rounded-lg cursor-pointer ${
//               sortBy === "createdAt" && sortOrder === "asc"
//                 ? "border-2 border-green-400 "
//                 : "border border-gray-400"
//             }`}
//           >
//             Oldest
//           </Button>
//           <Button
//             onClick={() => {
//               toggleNewest();
//             }}
//             className={`mr-2 p-2 border rounded-lg cursor-pointer ${
//               sortBy === "createdAt" && sortOrder === "desc"
//                 ? "border-2 border-green-400 "
//                 : "border border-gray-400"
//             }`}
//           >
//             Newest
//           </Button>
//           <Button
//             onClick={() => {
//               toggleVote();
//             }}
//             className={`mr-2 p-2 border rounded-lg cursor-pointer ${
//               sortBy === "vote" && sortOrder === "desc"
//                 ? "border-2 border-green-400 "
//                 : "border border-gray-400"
//             }`}
//           >
//             Most Upvoted
//           </Button>
//           <Button
//             onClick={() => {
//               toggleComment();
//             }}
//             className={`mr-2 p-2 border rounded-lg cursor-pointer ${
//               sortBy === "comments" && sortOrder === "desc"
//                 ? "border-2 border-green-400 "
//                 : "border border-gray-400"
//             }`}
//           >
//             Most commented
//           </Button>
//         </div>
//       </div>

//       <div className="mt-8">
//         {isLoading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="text-gray-500">Loading ideas...</div>
//           </div>
//         ) : (
//           <div>
//             {!data ? (
//               <div>No result found</div>
//             ) : (
//               <div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-4">
//                   {data?.data?.data?.map((idea: any) => (
//                     <div
//                       key={idea.id}
//                       className="flex flex-col gap-3 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow min-w-[280px] flex-shrink-0 bg-white"
//                     >
//                       <div className="relative w-full h-48">
//                         <Image
//                           src={idea.photo}
//                           alt={idea.title}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div className="p-4">
//                         <p className="text-gray-800 font-medium">
//                           {idea.title}
//                         </p>
//                         <p>{idea.isPaid ? "Paid" : "Free"}</p>
//                       </div>
//                       <div className="flex justify-center m-4">
//                         <Link
//                           href={
//                             idea.isPaid
//                               ? `/ideaDetails/paid/${idea.id}`
//                               : `/ideaDetails/${idea.id}`
//                           }
//                           className="inline-block mt-4 text-xs px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition-colors"
//                         >
//                           See Details
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div>
//                   {page > 1 && (
//                     <Button
//                       onClick={() => setPage(page - 1)}
//                       className={`px-2 mx-2 rounded-lg cursor-pointer border border-gray-400`}
//                     >
//                       {" "}
//                       Prev{" "}
//                     </Button>
//                   )}
//                   {buttons.map((button) => {
//                     return (
//                       <Button
//                         key={button}
//                         onClick={() => setPage(button)}
//                         className={`px-2 mx-2 rounded-lg cursor-pointer   ${
//                           page === button
//                             ? "bg-green-500 text-white"
//                             : "border border-gray-400"
//                         }`}
//                       >
//                         {button}
//                       </Button>
//                     );
//                   })}
//                   {page < totalPages && (
//                     <Button
//                       onClick={() => setPage(page + 1)}
//                       className={`px-2 mx-2 rounded-lg cursor-pointer border border-gray-400`}
//                     >
//                       {" "}
//                       Next{" "}
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/shared/searchbar";
import Category from "@/components/shared/category";
import { Button } from "@base-ui/react/button";
import { getFilteredIdeasAction } from "@/_actions/idea.action";
import {
  Loader2,
  AlertCircle,
  DollarSign,
  Eye,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MessageCircle,
  Calendar,
  Filter,
} from "lucide-react";
import ReusableItem from "@/components/shared/ReusableItem";
import Pagination from "@/components/shared/pagination";

export default function AllIdeas() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchedItem, setSearchedItem] = useState(null);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const limit = 10;
  const status = "APPROVED";
  let edited = undefined;

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "ideas",
      category,
      search,
      page,
      sortBy,
      sortOrder,
      status,
      limit,
    ],
    queryFn: () =>
      getFilteredIdeasAction(
        category,
        search,
        page,
        sortBy,
        sortOrder,
        status,
        edited,
        limit
      ),
  });

  const toggleOldest = () => {
    setSortBy("createdAt");
    setSortOrder("asc");
  };

  const toggleNewest = () => {
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  const toggleVote = () => {
    setSortBy("vote");
    setSortOrder("desc");
  };

  const toggleComment = () => {
    setSortBy("comments");
    setSortOrder("desc");
  };

  const isActive = (sortType: string, order: string) => {
    return sortBy === sortType && sortOrder === order;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Explore <span className="text-green-600">Ideas</span>
          </h1>
          <p className="text-gray-600 mb-8 ">
            Discover innovative solutions from our community
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col gap-6 mt-5">
          <SearchBar search={search} setSearch={setSearch} />
          <Category category={category} setCategory={setCategory} />

          {/* Sort Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">
                Sort By
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={toggleNewest}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive("createdAt", "desc")
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Calendar className="w-4 h-4" />
                Newest First
              </button>
              <button
                onClick={toggleOldest}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive("createdAt", "asc")
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Calendar className="w-4 h-4" />
                Oldest First
              </button>
              <button
                onClick={toggleVote}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive("vote", "desc")
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Most Upvoted
              </button>
              <button
                onClick={toggleComment}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive("comments", "desc")
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Most Commented
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading ideas...</p>
              <p className="text-gray-400 text-sm">
                Please wait while we fetch the latest ideas
              </p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Failed to Load Ideas
              </h3>
              <p className="text-red-600">
                {(error as Error)?.message || "Something went wrong"}
              </p>
            </div>
          ) : !data?.data?.data || data.data.data.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Ideas Found
              </h3>
              <p className="text-gray-500 mb-6">
                {category || search
                  ? "No ideas match your current filters. Try adjusting your search or category."
                  : "Be the first to share an idea with the community!"}
              </p>
              {(category || search) && (
                <button
                  onClick={() => {
                    setCategory("");
                    setSearch("");
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div>
              {/* Results Info */}
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-700">
                    {data.data.data.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-700">
                    {data.data.meta.total}
                  </span>{" "}
                  ideas
                </p>
                {(category || search) && (
                  <button
                    onClick={() => {
                      setCategory("");
                      setSearch("");
                    }}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Ideas Grid */}

              <ReusableItem
                data={data.data.data}
                meta={data.data.meta}
                page={page}
                setPage={setPage}
              />

              {/* Pagination */}
              <Pagination
                data={data}
                meta={data.data.meta}
                page={page}
                setPage={setPage}
                limit={limit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
