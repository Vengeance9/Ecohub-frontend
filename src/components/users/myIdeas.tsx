// "use client"
// import { getIdeasByUserIdAction } from "@/_actions/idea.action"

// import { useQuery } from "@tanstack/react-query"
// import ReusableItem from "./shared/ReusableItem"
// import { useEffect, useState } from "react";
// import DashboardItem from "./dashboardItems";
// import { Button } from "../ui/button";

// export default function MyIdeas(){
//     const [page, setPage] = useState(1);
//     const [sortBy, setSortBy] = useState("createdAt");
//     const [sortOrder, setSortOrder] = useState("desc");
//     const [status,setStatus]=useState("")

//     const {data,isLoading}=useQuery({
//         queryKey:["myIdeas",page,sortBy,sortOrder,status],
//         queryFn:()=>getIdeasByUserIdAction(page,sortBy,sortOrder,status)
//     })

//     const toggleNewest=()=>{
//         setSortBy(()=>sortBy==='createdAt'?'createdAt':'createdAt')
//         setSortOrder(()=>sortOrder==='desc'?'asc':'desc')
//     }

//     console.log('THIS IS THE DATA',data)

//     return (
//       <div>
//         <div className="flex gap-2 mb-3">
//           <p
//             className={`p-2 border cursor-pointer border-gray-600 rounded-lg ${
//               status === "DRAFT" ? "bg-gray-600 text-white" : ""
//             }`}
//             onClick={() =>
//               status === "DRAFT" ? setStatus("") : setStatus("DRAFT")
//             }
//           >
//             Drafed Ideas
//           </p>
//           <p
//             className={`p-2 border cursor-pointer border-gray-600 rounded-lg ${
//               status === "UNDERREVIEW" ? "bg-gray-600 text-white" : ""
//             }`}
//             onClick={() =>
//               status === "UNDERREVIEW"
//                 ? setStatus("")
//                 : setStatus("UNDERREVIEW")
//             }
//           >
//             Ideas under review
//           </p>
//           <p
//             className={`p-2 border cursor-pointer border-gray-600 rounded-lg ${
//               status === "APPROVED" ? "bg-gray-600 text-white" : ""
//             }`}
//             onClick={() =>
//               status === "APPROVED" ? setStatus("") : setStatus("APPROVED")
//             }
//           >
//             Approved Ideas
//           </p>
//           <p
//             className={`p-2 border cursor-pointer border-gray-600 rounded-lg ${
//               status === "REJECTED" ? "bg-gray-600 text-white" : ""
//             }`}
//             onClick={() =>
//               status === "REJECTED" ? setStatus("") : setStatus("REJECTED")
//             }
//           >
//             Rejected Ideas
//           </p>
//           <p
//             className={`p-2 border cursor-pointer border-gray-600 rounded-lg ${
//               sortOrder === "asc" ? "bg-gray-600 text-white" : ""
//             }`}
//             onClick={() => toggleNewest()}
//           >
//             Oldest Ideas
//           </p>
//         </div>
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : (
//           <div>
//             {!data || data.data.data.length === 0 ? (
//               <div>
//                 <div className="flex justify-center items-center py-12">
//                   <div className="text-gray-500">No result found</div>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <div>
//                   <DashboardItem
//                     data={data.data.data}
//                     meta={data.data.meta}
//                     page={page}
//                     setPage={setPage}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
// }

"use client";
import { getIdeasByUserIdAction } from "@/_actions/idea.action";
import { useQuery } from "@tanstack/react-query";
import ReusableItem from "../shared/ReusableItem";
import { useEffect, useState } from "react";
import DashboardItem from "../users/dashboardItems";
import { Button } from "../ui/button";
import {
  Loader2,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Filter,
  ArrowUpDown,
} from "lucide-react";

export default function MyIdeas() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [status, setStatus] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["myIdeas", page, sortBy, sortOrder, status],
    queryFn: () => getIdeasByUserIdAction(page, sortBy, sortOrder, status),
  });

  const toggleNewest = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <FileText className="w-4 h-4" />;
      case "UNDERREVIEW":
        return <Clock className="w-4 h-4" />;
      case "APPROVED":
        return <CheckCircle className="w-4 h-4" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4" />;
      case "WatchListed":
        return <Eye className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const statusColors = {
    DRAFT: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200",
    UNDERREVIEW:
      "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200",
    APPROVED: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
    REJECTED: "bg-red-100 text-red-700 border-red-200 hover:bg-red-200",
    WatchListed: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200",
  };

  const statusActiveColors = {
    DRAFT: "bg-gray-600 text-white border-gray-600",
    UNDERREVIEW: "bg-yellow-600 text-white border-yellow-600",
    APPROVED: "bg-green-600 text-white border-green-600",
    REJECTED: "bg-red-600 text-white border-red-600",
    WatchListed: "bg-gray-600 text-white border-gray-600",
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Ideas</h1>
        <p className="text-gray-600">
          Manage and track all your submitted ideas
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">
            Filter by Status
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
              status === ""
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setStatus("")}
          >
            <Eye className="w-4 h-4" />
            All Ideas
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
              status === "DRAFT" ? statusActiveColors.DRAFT : statusColors.DRAFT
            }`}
            onClick={() =>
              status === "DRAFT" ? setStatus("") : setStatus("DRAFT")
            }
          >
            {getStatusIcon("DRAFT")}
            Draft
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
              status === "UNDERREVIEW"
                ? statusActiveColors.UNDERREVIEW
                : statusColors.UNDERREVIEW
            }`}
            onClick={() =>
              status === "UNDERREVIEW"
                ? setStatus("")
                : setStatus("UNDERREVIEW")
            }
          >
            {getStatusIcon("UNDERREVIEW")}
            Under Review
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
              status === "APPROVED"
                ? statusActiveColors.APPROVED
                : statusColors.APPROVED
            }`}
            onClick={() =>
              status === "APPROVED" ? setStatus("") : setStatus("APPROVED")
            }
          >
            {getStatusIcon("APPROVED")}
            Approved
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
              status === "REJECTED"
                ? statusActiveColors.REJECTED
                : statusColors.REJECTED
            }`}
            onClick={() =>
              status === "REJECTED" ? setStatus("") : setStatus("REJECTED")
            }
          >
            {getStatusIcon("REJECTED")}
            Rejected
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
              status === "WatchListed"
                ? statusActiveColors.WatchListed
                : statusColors.WatchListed
            }`}
            onClick={() =>
              status === "WatchListed"
                ? setStatus("")
                : setStatus("WatchListed")
            }
          >
            {getStatusIcon("WatchListed")}
            Your WatchListed
          </button>
          <div className="flex-1"></div>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
              sortOrder === "asc"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={toggleNewest}
          >
            <ArrowUpDown className="w-4 h-4" />
            <Calendar className="w-4 h-4" />
            {sortOrder === "desc" ? "Newest First" : "Oldest First"}
          </button>
        </div>
      </div>

      {/* Content Section */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Loading your ideas...</p>
          <p className="text-gray-400 text-sm">
            Please wait while we fetch your data
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-red-600 font-medium">Failed to load ideas</p>
          <p className="text-red-500 text-sm mt-1">Please try again later</p>
        </div>
      ) : (
        <div>
          {!data || data.data.data.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Ideas Found
              </h3>
              <p className="text-gray-500 mb-6">
                {status
                  ? `You don't have any ${status.toLowerCase()} ideas yet`
                  : "You haven't submitted any ideas yet"}
              </p>
              <button
                onClick={() => (window.location.href = "/ideas/create")}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                Create Your First Idea
              </button>
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
                    {data.data.meta?.total || data.data.data.length}
                  </span>{" "}
                  ideas
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

              {/* Dashboard Items */}
              <DashboardItem
                data={data.data.data}
                meta={data.data.meta}
                page={page}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
