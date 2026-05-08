// "use client"
// import Link from "next/link";
// import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
// import { useQuery } from "@tanstack/react-query";
// import { getUserInfoAction } from "@/_actions/auth.action";



// export default function Navbar() {
//   let user = false;

//   const { data, isLoading } = useQuery({
//     queryKey: ["user"],
//     queryFn: () => getUserInfoAction(),
//   });

//   user = data;
//   console.log('THIS IS THE USER',user)
//     return (
//       <div className="flex items-center justify-between py-4 px-5 bg-green-600 text-white font-semibold">
//         <Link href="/">EcoHub</Link>

//         <NavigationMenu>
//           <NavigationMenuList className="gap-3">
//             <NavigationMenuItem>
              
//                 <Link href="/">Home</Link>
              
//             </NavigationMenuItem>
//             <NavigationMenuItem>
              
//                 <Link href="/AllIdeas">Ideas</Link>
              
//             </NavigationMenuItem>

//             {user?(
//               <div className="flex gap-3">
//                 <NavigationMenuItem>
                  
//                     <Link href="/">Profile</Link>
                  
//                 </NavigationMenuItem>
//                 <NavigationMenuItem>
                  
//                     <Link href="/memberDashboard">Dashboard</Link>
                  
//                 </NavigationMenuItem>
//               </div>
//             ):(
//               <div className="flex gap-3">
//                 <NavigationMenuItem>
                  
//                     <Link href="/login?redirectPath=/">Login</Link>
                  
//                 </NavigationMenuItem>
//                 <NavigationMenuItem>
                  
//                     <Link href="/register">Register</Link>
                  
//                 </NavigationMenuItem>
//               </div>
//             )}
//           </NavigationMenuList>
//         </NavigationMenu>
//       </div>
//     );
// }


"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfoAction, logoutAction } from "@/_actions/auth.action";
import { useState } from "react";
import {
  Menu,
  X,
  Leaf,
  User,
  LayoutDashboard,
  LogIn,
  UserPlus,
  Home,
  Lightbulb,
  LogOut,
  Notebook,
  Info,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname()
  const [active,setActive] = useState("")
  const [loggingout,setLoggingOut] = useState(false)
  const queryClient = useQueryClient()
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfoAction(),
    staleTime:0
  });

  console.log("USER",user)

  const handleLogout = async () => {
    try{
    setLoggingOut(true)
    queryClient.removeQueries({ queryKey: ["user"] });
    await logoutAction()
    }finally{
      setLoggingOut(false)
    }
    
    
  }


  
  return (
    <div className="w-full border-b bg-green-400 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-green-600 tracking-tight flex gap-1"
        >
          <div className="bg-white/20 p-1.5 rounded-lg group-hover:bg-white/30 transition-all duration-300">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
            EcoHub
          </span>
        </Link>

        {/* Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-6 text-gray-700 font-medium">
            <NavigationMenuItem>
              <Link
                href="/"
                className={`${
                  pathname === "/"
                    ? "text-white bg-green-600 px-4 py-2 rounded-xl"
                    : "hover:text-green-600"
                }  transition-colors duration-200 flex gap-1 items-center`}
                onClick={() => setActive("Home")}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/AllIdeas"
                className={`${
                  pathname === "/AllIdeas"
                    ? "text-white bg-green-600 px-4 py-2 rounded-xl"
                    : "hover:text-green-600"
                }  transition-colors duration-200 flex gap-1 items-center -mr-5`}
                onClick={() => setActive("AllIdeas")}
              >
                <Lightbulb className="w-4 h-4" />
                Ideas
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/BlogPage"
                className={`${
                  pathname === "/BlogPage"
                    ? "text-white bg-green-600 px-4 py-2 rounded-xl"
                    : "hover:text-green-600"
                }  transition-colors duration-200 flex gap-1 items-center -mr-5 ml-3`}
                onClick={() => setActive("AllIdeas")}
              >
                <Notebook className="w-4 h-4" />
                Blog
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/AboutUs"
                className={`${
                  pathname === "/AboutUS"
                    ? "text-white bg-green-600 px-4 py-2 rounded-xl"
                    : "hover:text-green-600"
                }  transition-colors duration-200 flex gap-1 items-center -mr-5 ml-3`}
                onClick={() => setActive("AllIdeas")}
              >
                <Info className="w-4 h-4" />
                About Us
              </Link>
            </NavigationMenuItem>

            {/* Auth Section */}
            {!isLoading && user ? (
              <div className="flex items-center gap-4 ml-3">
                <NavigationMenuItem>
                  <Link
                    href="/profile"
                    className={`${
                      pathname === "/profile"
                        ? "text-white bg-green-600 px-4 py-2 rounded-xl"
                        : "hover:text-green-600"
                    }  transition-colors duration-200 flex gap-1 items-center`}
                    onClick={() => setActive("Profile")}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href={user.role === "USER" ? "/users/memberDashboard" : "/admin/adminDashboard"}
                    className={`${
                      pathname === "/users/memberDashboard" || pathname === "/admin/adminDashboard"
                        ? "text-white bg-green-600 px-4 py-2 rounded-xl"
                        : "hover:text-green-600"
                    }  transition-colors duration-200 flex gap-1 items-center`}
                    onClick={() => setActive("Dashboard")}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    className={`${
                      active === "Logout"
                        ? "text-white bg-green-600 px-4 py-2 rounded-xl"
                        : "hover:text-green-600"
                    }  transition-colors duration-200 flex gap-1 items-center`}
                    onClick={async () => handleLogout()
                    }
                    aria-disabled={loggingout}
                  >
                    <LogOut className="w-4 h-4" />
                    {loggingout ? "Logging out..." : "Logout"}
                  </button>
                </NavigationMenuItem>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-3">
                <NavigationMenuItem>
                  <Link
                    href="/login?redirectPath=/"
                    className={`${
                      pathname === "/login"
                        ? "text-white bg-green-600 px-4 py-2 rounded-xl"
                        : "hover:text-green-600"
                    }  transition-colors duration-200 flex gap-1 items-center`}
                    onClick={() => setActive("Login")}
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/signup?redirectPath=/login"
                    className={`${
                      pathname === "/signup"
                        ? "text-white bg-green-600 px-4 py-2 rounded-xl"
                        : "hover:text-green-600"
                    }  transition-colors duration-200 flex gap-1 items-center`}
                    onClick={() => setActive("Register")}
                  >
                    <UserPlus className="w-4 h-4" />
                    Register
                  </Link>
                </NavigationMenuItem>
              </div>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}