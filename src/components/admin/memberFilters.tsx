"use client";
import {
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  Lightbulb,
  MessageCircle,
  Pencil,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export default function MemberFilters({
  userRole,
  userStatus,
  setUserRole,
  setUserStatus,
  userSortBy,
  userSortOrder,
  setUserSortBy,
  setUserSortOrder,
  userSubscribed,
  setUserSubscribed
}: {
  userRole: string;
  userStatus: string;
  setUserRole: Function;
  setUserStatus: Function;
  userSortBy: string;
  userSortOrder: string,
  setUserSortBy: Function,
  setUserSortOrder: Function,
  userSubscribed: string,
  setUserSubscribed: Function
}) {



  const toggleOldest = () => {
    if (userSortOrder === "asc") {
      setUserSortOrder("desc");
      setUserSortBy("createdAt");
    } else {
      setUserSortOrder("asc");
      setUserSortBy("createdAt");
    }
  };

  const toggleNewest = () => {
    setUserSortBy("createdAt");
    setUserSortOrder("desc");
  };

  const isActive = (sortType: string, order: string) => {
     return userSortBy === sortType && userSortOrder === order;
   };

   const toggleIdeaCount = () => {
    if(userSortBy === 'Idea'){
      setUserSortBy("");
    }else{
      setUserSortBy("Idea");
    }
}
   const toggleSubscribed = () => {
    if(userSubscribed === 'subscribed'){
      setUserSubscribed("");
    }else{
      setUserSubscribed("subscribed");
      setUserSortBy("")
    }
}

const toggleAdmin = () => {
  if(userRole === 'ADMIN'){
    setUserRole("");
  }else{
    setUserRole("ADMIN");
  }
}

const toggleUser = () => {
  if(userRole === 'USER'){
    setUserRole("");
  }else{
    setUserRole("USER");
  }
}




  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">
            Filter by userStatus
          </span>
        </div>
        <div className="flex flex-col flex-wrap gap-2">
        
          <button
            className={`flex items-center gap-2 w-1/3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              userStatus === "INACTIVE"
                ? "bg-blue-300 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() =>
              userStatus === "INACTIVE"
                ? setUserStatus("")
                : setUserStatus("INACTIVE")
            }
          >
            <Clock className="w-4 h-4" />
            INACTIVE
          </button>

        
          <button
            className={`flex items-center gap-2 w-1/3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              userStatus === "ACTIVE"
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() =>
              userStatus === "ACTIVE"
                ? setUserStatus("")
                : setUserStatus("ACTIVE")
            }
          >
            <CheckCircle className="w-4 h-4" />
            ACTIVE
          </button>

         
          <button
            className={`flex items-center gap-2 w-1/3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              userStatus === "BLOCKED"
                ? "bg-red-500 text-white border-red-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() =>
              userStatus === "BLOCKED"
                ? setUserStatus("")
                : setUserStatus("BLOCKED")
            }
          >
            <XCircle className="w-4 h-4" />
            BLOCKED
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
                onClick={toggleIdeaCount}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  userSortBy==='Idea'
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                User with most ideas
              </button>
              <button
                onClick={toggleSubscribed}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  userSubscribed==='subscribed'
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Users className="w-4 h-4" />
                Subscribed users
              </button>
              <button
                onClick={toggleAdmin}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  userRole==='ADMIN'
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Admins
                
              </button>
              <button
                onClick={toggleUser}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  userRole==='USER'
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Users
                
              </button>
              
              
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
