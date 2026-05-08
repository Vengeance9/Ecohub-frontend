// "use client";
// import { getFilteredIdeasAction, getIdeasByUserIdAction } from "@/_actions/idea.action";

// import { useQuery } from "@tanstack/react-query";
// import ReusableItem from "../shared/ReusableItem";
// import { useEffect, useState } from "react";
// import DashboardItem from "../dashboardItems";
// import { Button } from "../../ui/button";
// import AdminDashboardItem from "./adminDashboardItems";

// export default function AdminIdeas({category,search}:{category:string,search:string}) {
   
//   const [page, setPage] = useState(1);
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [status, setStatus] = useState("");

//   const {
//     data: itemData,
//     error: itemError,
//     isLoading: itemLoading,
//   } = useQuery({
//     queryKey: ["ideas", category,search, status, sortBy, sortOrder, page],
//     queryFn: () => getFilteredIdeasAction(category,search,page, sortBy, sortOrder, status),
//   });

//   const toggleNewest = () => {
//     setSortBy(() => (sortBy === "createdAt" ? "createdAt" : "createdAt"));
//     setSortOrder(() => (sortOrder === "desc" ? "asc" : "desc"));
//   };

//   return (
//     <div>
//       <div className="flex gap-2 mb-3">
        
//         <p
//           className={`p-2 border cursor-pointer border-gray-600 rounded-lg ${
//             status === "UNDERREVIEW" ? "bg-gray-600 text-white" : ""
//           }`}
//           onClick={() =>
//             status === "UNDERREVIEW" ? setStatus("") : setStatus("UNDERREVIEW")
//           }
//         >
//           Ideas under review
//         </p>
//         <p
//           className={`p-2 border cursor-pointer border-gray-600 rounded-lg ${
//             status === "APPROVED" ? "bg-gray-600 text-white" : ""
//           }`}
//           onClick={() =>
//             status === "APPROVED" ? setStatus("") : setStatus("APPROVED")
//           }
//         >
//           Approved Ideas
//         </p>
//         <p
//           className={`p-2 border cursor-pointer border-gray-600 rounded-lg ${
//             status === "REJECTED" ? "bg-gray-600 text-white" : ""
//           }`}
//           onClick={() =>
//             status === "REJECTED" ? setStatus("") : setStatus("REJECTED")
//           }
//         >
//           Rejected Ideas
//         </p>
//         <p
//           className={`p-2 border cursor-pointer border-gray-600 rounded-lg ${
//             sortOrder === "asc" ? "bg-gray-600 text-white" : ""
//           }`}
//           onClick={() => toggleNewest()}
//         >
//           Oldest Ideas
//         </p>
//       </div>
//       {itemLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           {!itemData || itemData.data.data.length === 0 ? (
//             <div>
//               <div className="flex justify-center items-center py-12">
//                 <div className="text-gray-500">No result found</div>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div>
//                 <AdminDashboardItem
//                   data={itemData.data.data}
//                   meta={itemData.data.meta}
//                   page={page}
//                   setPage={setPage}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import {
  getFilteredIdeasAction,
  getIdeasByUserIdAction,
} from "@/_actions/idea.action";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";



import {
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Filter,
  TrendingUp,
  MessageCircle,
  Pencil,
} from "lucide-react";
import AdminDashboardItem from "./adminDashboardItems";

export default function AdminIdeas({
  category,
  search,
}: {
  category: string;
  search: string;
}) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [usersortBy, setUserSortBy] = useState("createdAt");
  const [userSortOrder, setUserSortOrder] = useState("desc");
  const [status, setStatus] = useState("");
  const [edited, setEdited] = useState("");

  const {
    data: itemData,
    error: itemError,
    isLoading: itemLoading,
  } = useQuery({
    queryKey: ["adminIdeas", category, search, status, sortBy, sortOrder, page,edited],
    queryFn: () =>
      getFilteredIdeasAction(category, search, page, sortBy, sortOrder, status,edited),
  });

  const toggleOldest = () => {
    if(sortOrder === "asc"){
      setSortOrder("desc");
      setSortBy("createdAt")
    }else{
      setSortOrder("asc");
      setSortBy("createdAt")
    }
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
      if(sortBy === "comments" && sortOrder === "desc"){
        setSortBy("");
        setSortOrder("");
      }else{
        setSortBy("comments");
        setSortOrder("desc");
      }
      
    };

    const toggleEditedAt = () => {
      if(edited === "editedAt"){
        setEdited("")
        setSortOrder("desc")
        
      }else{
        setEdited("editedAt")
      }
     
    };

      const isActive = (sortType: string, order: string) => {
        return sortBy === sortType && sortOrder === order;
      };

  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case "UNDERREVIEW":
        return <Clock className="w-4 h-4" />;
      case "APPROVED":
        return <CheckCircle className="w-4 h-4" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Filter className="w-4 h-4" />;
    }
  };

  const getStatusClass = (statusValue: string, isActive: boolean) => {
    if (!isActive) {
      return "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200";
    }
    switch (statusValue) {
      case "UNDERREVIEW":
        return "bg-blue-600 text-white border-blue-600";
      case "APPROVED":
        return "bg-green-600 text-white border-green-600";
      case "REJECTED":
        return "bg-red-600 text-white border-red-600";
      default:
        return "bg-gray-600 text-white border-gray-600";
    }
  };

  // if (itemLoading) {
  //   return (
  //     <div className="flex flex-col items-center justify-center py-20">
  //       <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
  //       <p className="text-gray-600 font-medium">Loading ideas...</p>
  //       <p className="text-gray-400 text-sm">
  //         Please wait while we fetch the data
  //       </p>
  //     </div>
  //   );
  // }

  if (itemError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Failed to Load Ideas
        </h3>
        <p className="text-red-600">
          There was an error loading the ideas. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">
            Filter by Status
          </span>
        </div>
        <div className="flex flex-col flex-wrap gap-2">
          {/* Under Review Filter */}
          <button
            className={`flex items-center gap-2 w-1/3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              status === "UNDERREVIEW"
                ? "bg-blue-300 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() =>
              status === "UNDERREVIEW"
                ? setStatus("")
                : setStatus("UNDERREVIEW")
            }
          >
            <Clock className="w-4 h-4" />
            Under Review
          </button>

          {/* Approved Filter */}
          <button
            className={`flex items-center gap-2 w-1/3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              status === "APPROVED"
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() =>
              status === "APPROVED" ? setStatus("") : setStatus("APPROVED")
            }
          >
            <CheckCircle className="w-4 h-4" />
            Approved
          </button>

          {/* Rejected Filter */}
          <button
            className={`flex items-center gap-2 w-1/3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              status === "REJECTED"
                ? "bg-red-500 text-white border-red-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() =>
              status === "REJECTED" ? setStatus("") : setStatus("REJECTED")
            }
          >
            <XCircle className="w-4 h-4" />
            Rejected
          </button>

          <div className="flex-1"></div>



          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-gray-500" />
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
              <button
                onClick={toggleEditedAt}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  edited==='editedAt'
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Pencil className="w-4 h-4" />
                Recently Edited
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Info */}
      {!itemLoading && itemData?.data?.data?.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {itemData.data.data.length}
            </span>{" "}
            ideas
            {status && (
              <span className="ml-1">
                with status: <span className="font-medium">{status}</span>
              </span>
            )}
          </p>
          {status && (
            <button
              onClick={() => setStatus("")}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Clear Filter
            </button>
          )}
        </div>
      )}

      {/* No Results */}
      {!itemLoading && (!itemData || itemData.data.data.length === 0) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Ideas Found
          </h3>
          <p className="text-gray-500 mb-6">
            {status
              ? `There are no ideas with status "${status}" matching your criteria.`
              : "No ideas found matching your search criteria."}
          </p>
          {(category || search || status) && (
            <button
              onClick={() => {
                setStatus("");
                // Also clear category and search if you have access to those setters
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {itemLoading && (
          
    
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading ideas...</p>
        <p className="text-gray-400 text-sm">
          Please wait while we fetch the data
        </p>
      </div>
      )
  }
     



      {/* Ideas Grid */}
      {!itemLoading && itemData?.data?.data?.length > 0 && (
        <AdminDashboardItem
          data={itemData.data.data}
          meta={itemData.data.meta}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}
