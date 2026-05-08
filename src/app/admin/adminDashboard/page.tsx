// "use client";
// import { useState } from "react";

// import { useMutation, useQuery } from "@tanstack/react-query";
// import { getFilteredIdeasAction } from "@/_actions/idea.action";
// import Category from "@/components/homepage/shared/category";
// import { createCategoryAction } from "@/_actions/category.action";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import AdminIdeas from "@/components/homepage/admin/adminIdeas";
// import SearchBar from "@/components/homepage/shared/searchbar";
// import AdminUserManagement from "@/components/homepage/admin/adminUserManagement";

// export default function AdminDashboard() {
//   const [category, setCategory] = useState("");
//   const [search, setSearch] = useState("");
//   const [searchedItem, setSearchedItem] = useState(null);
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [status, setStatus] = useState("");
//   const [page, setPage] = useState(1);
//   const [catBox, setCatBox] = useState(false);

//   const limit = 10;
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["ideas", category, search, page, sortBy, sortOrder],
//     queryFn: () =>
//       getFilteredIdeasAction(category, search, page, sortBy, sortOrder),
//   });

//   const { mutate: createCategory, isPending } = useMutation({
//     mutationFn: () => createCategoryAction(category),
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
//     <div>
//       <Category category={category} setCategory={setCategory} />
//       <SearchBar search={search} setSearch={setSearch} />
//       <div className="flex flex-col">
//         <button
//           onClick={() => setCatBox(true)}
//           disabled={catBox}
//           className="w-[250px] mt-8 px-4 py-2 cursor-pointer transition-all duration-200 rounded-lg border hover:bg-green-700 hover:text-white"
//         >
//           Create new category
//         </button>
//         {catBox && (
//           <div>
//             <Input
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-1/4 border-2"
//             />
//             <Button
//               onClick={() => createCategory()}
//               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
//             >
//               {isPending ? "Creating..." : "Create"}
//             </Button>
//           </div>
//         )}
//       </div>

//       <div><AdminIdeas category={category} search={search} /></div>
//       <AdminUserManagement />
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFilteredIdeasAction } from "@/_actions/idea.action";
import Category from "@/components/shared/category";
import { createCategoryAction } from "@/_actions/category.action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminIdeas from "@/components/admin/adminIdeas";
import SearchBar from "@/components/shared/searchbar";
import AdminUserManagement from "@/components/admin/adminUserManagement";
import {
  Plus,
  Users,
  Lightbulb,
  Settings,
  X,
  Loader2,
  AlertCircle,
  TrendingUp,
  MessageCircle,
  Calendar,
  Filter,
  Check,
} from "lucide-react";

export default function AdminDashboard() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchedItem, setSearchedItem] = useState(null);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [catBox, setCatBox] = useState(false);
  const [activeTab, setActiveTab] = useState<"ideas" | "users">("ideas");
  const [catCreated, setCatCreated] = useState(false);

  const limit = 10;
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["ideas", category, search, page, sortBy, sortOrder],
  //   queryFn: () =>
  //     getFilteredIdeasAction(category, search, page, sortBy, sortOrder),
  // });

  const {
    mutate: createCategory,
    isSuccess: catSuccess,
    isPending,
  } = useMutation({
    mutationFn: () => createCategoryAction(category),
    onSuccess: () => {
      setCategory("");
      setCatBox(false);
    },
  });

  // const totalPages = data ? Math.ceil(data.data.meta.total / limit) : 0;
  // let buttons = [];
  // let i = 1;
  // while (i <= totalPages) {
  //   buttons.push(i);
  //   i++;
  // }

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

  useEffect(() => {
    if (catSuccess) {
      setCatCreated(true);
      const timer = setTimeout(() => {
        setCatCreated(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [catSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 flex flex-col gap-4">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col gap-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-xl">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600 ml-12">
            Manage ideas, categories, and users from a single dashboard
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 border-b border-gray-200 bg-white rounded-t-xl px-4">
            <button
              onClick={() => setActiveTab("ideas")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === "ideas"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              Manage Ideas
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === "users"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Users className="w-4 h-4" />
              Manage Users
            </button>
          </div>
        </div>

        {/* Ideas Tab Content */}
        {activeTab === "ideas" && (
          <div className="space-y-6">
            {/* Filters Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Filters & Categories
                </h2>
              </div>

              <div className="flex flex-col gap-6">
                <Category category={category} setCategory={setCategory} />
                <SearchBar search={search} setSearch={setSearch} />
              </div>
            </div>

            {/* Create Category Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Create New Category
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add a new category for ideas
                  </p>
                </div>
                {!catBox ? (
                  <button
                    onClick={() => setCatBox(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    disabled={isPending}
                  >
                    <Plus className={`w-4 h-4 ${catCreated && "hidden"}`} />

                    {isPending ? (
                      "Creating..."
                    ) : catCreated ? (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Created</span>
                      </div>
                    ) : (
                      "Create New Category"
                    )}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Category name"
                      className="w-64"
                      autoFocus
                    />
                    <Button
                      onClick={() => createCategory()}
                      disabled={isPending || !category.trim()}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Create"
                      )}
                    </Button>
                    <button
                      onClick={() => {
                        setCatBox(false);
                        setCategory("");
                      }}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sort Options */}

            {/* Admin Ideas Component */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-white" />
                  <h2 className="text-xl font-bold text-white">All Ideas</h2>
                </div>
                <p className="text-green-100 text-sm mt-1">
                  Review and manage all submitted ideas
                </p>
              </div>
              <div className="p-6">
                <AdminIdeas category={category} search={search} />
              </div>
            </div>
          </div>
        )}

        {/* Users Tab Content */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <h2 className="text-xl font-bold text-white">
                  User Management
                </h2>
              </div>
              <p className="text-green-100 text-sm mt-1">
                Manage users, roles, and permissions
              </p>
            </div>
            <div className="p-6">
              <AdminUserManagement />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
