// "use client"

// import { getUserInfoAction } from "@/_actions/auth.action"
// import { getUserIdeaInfoAction } from "@/_actions/idea.action"
// import MyIdeas from "@/components/homepage/myIdeas"
// import { useQuery } from "@tanstack/react-query"


// export default function MemberDashboard(){
//     const {data,isLoading}=useQuery({
//         queryKey:["userInfo"],
//         queryFn:()=>getUserIdeaInfoAction()
//     })
//     return(
//         <div>
//             <h1>Welcome</h1>
//             <div>
//                 <h1>Total approved ideas: {data?.data.approvedIdeas}</h1>
//                 <h1>Total rejected ideas: {data?.data.rejectedIdeas}</h1>
//                 <h1>Total drafted ideas: {data?.data.draftedIdeas}</h1>
//                 <h1>Total ideas: {data?.data.totalIdeas}</h1>
//                 <h1>Total upvotes: {data?.data.totalUpvotes}</h1>
//                 <h1>Total downvotes: {data?.data.totalDownvotes}</h1>
//                 <h1>Total revenue: {data?.data.Revenue}</h1>
                
//             </div>
//             <div>
//                 <h1>Your Ideas</h1>
               
//                 <MyIdeas/>
//             </div>
//         </div>
//     )
// }

"use client";

import { getUserInfoAction } from "@/_actions/auth.action";
import { getUserIdeaInfoAction } from "@/_actions/idea.action";
import MyIdeas from "@/components/users/myIdeas";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  CheckCircle,
  XCircle,
  FileText,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  DollarSign,
  TrendingUp,
  Award,
  User,
} from "lucide-react";

export default function MemberDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserIdeaInfoAction(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
          <p className="text-gray-400 text-sm">Fetching your statistics</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600">
            Could not load your dashboard data. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = data?.data;

  const statCards = [
    {
      title: "Total Ideas",
      value: stats?.totalIdeas || 0,
      icon: Lightbulb,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Approved Ideas",
      value: stats?.approvedIdeas || 0,
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Rejected Ideas",
      value: stats?.rejectedIdeas || 0,
      icon: XCircle,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      title: "Drafted Ideas",
      value: stats?.draftedIdeas || 0,
      icon: FileText,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "Total Upvotes",
      value: stats?.totalUpvotes || 0,
      icon: ThumbsUp,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Total Downvotes",
      value: stats?.totalDownvotes || 0,
      icon: ThumbsDown,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.Revenue || 0}`,
      icon: DollarSign,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Net Score",
      value: (stats?.totalUpvotes || 0) - (stats?.totalDownvotes || 0),
      icon: TrendingUp,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 space-y-2">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col gap-8">
        {/* Welcome Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-xl">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Member Dashboard
            </h1>
          </div>
          <p className="text-gray-600 ml-12 mb-5">
            Track your ideas, votes, and earnings all in one place
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`h-1 bg-gradient-to-r ${stat.color}`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-gray-600 font-medium text-sm">
                  {stat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => (window.location.href = "/users/createIdeas")}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            Create New Idea
          </button>
        </div>

        {/* Your Ideas Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-5">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-white" />
              <h2 className="text-xl font-bold text-white">Your Ideas</h2>
            </div>
            <p className="text-green-100 text-sm mt-1">
              Manage and track all your submitted ideas
            </p>
          </div>

          <div className="p-6">
            <MyIdeas />
          </div>
        </div>

        {/* Quick Actions */}
      </div>
    </div>
  );
}