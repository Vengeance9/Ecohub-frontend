"use client";
import {
  updateRoleAction,
  updateStatusAction,
  viewMemberAction,
} from "@/_actions/admin.action";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/pagination";
import {
  Activity,
  Ban,
  Bell,
  CheckCircle,
  ChevronDown,
  Circle,
  Clock,
  Cross,
  Mail,
  Shield,
  Trash,
  Trash2,
  User,
  UserCircle,
  X,
} from "lucide-react";
import MemberFilters from "./memberFilters";

export default function AdminUserManagement() {
  const [roleModalOpen, setRoleModalOpen] = useState("");
  const [statusModalOpen, setStatusModalOpen] = useState("");
  const [page, setPage] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userSortBy, setUserSortBy] = useState("");
  const [userSortOrder, setUserSortOrder] = useState("");
  const [userSubscribed, setUserSubscribed] = useState("");
  let limit = 5;

  const { data: members, isLoading: membersLoading } = useQuery({
    queryKey: [
      "members",
      page,
      limit,
      userRole,
      userStatus,
      userSortBy,
      userSortOrder,
      userSubscribed,
    ],
    queryFn: () =>
      viewMemberAction(
        page,
        limit,
        userRole,
        userStatus,
        userSortBy,
        userSortOrder,
        userSubscribed
      ),
  });
  const {
    mutate: updateRole,
    isPending: isUpdateRolePending,
    isSuccess: isUpdateRoleSuccess,
  } = useMutation({
    mutationFn: (id: string) => updateRoleAction(id),
  });

  const {
    mutate: updateStatus,
    isPending: isUpdateStatusPending,
    isSuccess: isUpdateStatusSuccess,
  } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateStatusAction(id, status),
  });
  const roleModaltoggle = (id: string) => {
    if (roleModalOpen === "" || roleModalOpen !== id) {
      setRoleModalOpen(id);
    } else setRoleModalOpen("");
  };
  const statusModaltoggle = (id: string) => {
    if (statusModalOpen === "" || statusModalOpen !== id) {
      setStatusModalOpen(id);
    } else setStatusModalOpen("");
  };

  console.log("THIS IS THE MEMBERS IN adminUserManagement", members);

  return (
    <div className="font-medium">
      <div>
        <h1 className="text-2xl ml-4">Members</h1>

        <div>
          <MemberFilters
            userRole={userRole}
            userStatus={userStatus}
            setUserRole={setUserRole}
            setUserStatus={setUserStatus}
            userSortBy={userSortBy}
            userSortOrder={userSortOrder}
            setUserSortBy={setUserSortBy}
            setUserSortOrder={setUserSortOrder}
            userSubscribed={userSubscribed}
            setUserSubscribed={setUserSubscribed}
          />
        </div>

        {membersLoading ? (
          <div className="flex items-center gap-1 text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="ml-2 text-sm">Loading</span>
          </div>
        ) : (
          <div className="font-medium">
            <Table className="m-4  rounded-lg">
              <TableHeader>
                <TableRow className="">
                  <TableHead className="flex gap-1 items-center">
                    <User className="h-3 w-3" />
                    name
                  </TableHead>
                  <TableHead className="">
                    <div className="flex gap-1 items-center">
                      <Mail className="h-3 w-3" />
                      email
                    </div>
                  </TableHead>
                  <TableHead className="">
                    <div>
                      <div className="flex gap-1 items-center">
                        <UserCircle className="h-3 w-3" />
                        role
                      </div>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex gap-1 items-center">
                      <Activity className="h-3 w-3" />
                      status
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex gap-1 items-center">
                      <Trash className="h-3 w-3" />
                      Idea Count
                    </div>
                  </TableHead>

                  <TableHead className="">
                    <div className="flex gap-1 items-center">
                      <Bell className="h-3 w-3" />
                      isSubscribed
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members?.data?.data.map((member: any) => (
                  <TableRow key={member.id} className=" relative">
                    <TableCell className="">{member.name} </TableCell>
                    <TableCell className=""> {member.email} </TableCell>
                    <TableCell className="">
                      <button
                        onClick={() => roleModaltoggle(member.id)}
                        className={`${
                          member.role === "USER"
                            ? " text-black hover:cursor-pointer"
                            : "bg-red-200 text-red-600 px-2 py-1 rounded-lg"
                        }`}
                      >
                        {" "}
                        {member.role === "USER" ? (
                          <div className="flex items-center gap-1">
                            User
                            <ChevronDown className="h-4 w-4 text-black" />
                          </div>
                        ) : (
                          "Admin"
                        )}
                      </button>
                      {roleModalOpen === member.id &&
                        member.role === "USER" && (
                          <div className="absolute top-10 left-100 p-4 z-10 border border-gray-300 rounded-lg bg-white shadow-200 ">
                            <button
                              className="cursor-pointer mb-2 text-blue-600"
                              onClick={() => updateRole(member.id)}
                            >
                              {isUpdateRolePending ? (
                                <p className="animate-pulse">Updating...</p>
                              ) : isUpdateRoleSuccess ? (
                                <p className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  Updated
                                </p>
                              ) : (
                                <div className="flex items-center gap-1 border-b border-gray-600 font-medium">
                                  <Shield className="h-4 w-4" />
                                  Change to admin
                                </div>
                              )}
                            </button>
                            <p
                              onClick={() => roleModaltoggle("")}
                              className="cursor-pointer text-red-400 flex items-center gap-1 font-medium"
                            >
                              <X className="h-4 w-4" />
                              Close
                            </p>
                          </div>
                        )}
                    </TableCell>
                    <TableCell className="">
                      <button onClick={() => statusModaltoggle(member.id)}>
                        {member.status === "ACTIVE" && (
                          <div
                            className={`flex items-center gap-1 ${
                              member.role === "ADMIN"
                                ? "bg-red-200 px-2 py-1 rounded-lg"
                                : ""
                            }`}
                          >
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                            ACTIVE
                            <ChevronDown
                              className={
                                member.role === "USER"
                                  ? `h-4 w-4 text-black`
                                  : `hidden`
                              }
                            />
                          </div>
                        )}
                        {member.status === "INACTIVE" && (
                          <div
                            className={`flex items-center gap-1 ${
                              member.role === "ADMIN"
                                ? "bg-red-200 px-2 py-1 rounded-lg"
                                : ""
                            }`}
                          >
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            INACTIVE
                            <ChevronDown
                              className={
                                member.role === "USER"
                                  ? `h-4 w-4 text-black`
                                  : `hidden`
                              }
                            />
                          </div>
                        )}
                        {member.status === "BLOCKED" && (
                          <div
                            className={`flex items-center gap-1 ${
                              member.role === "ADMIN"
                                ? "bg-red-200 px-2 py-1 rounded-lg"
                                : ""
                            }`}
                          >
                            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                            BLOCKED
                            <ChevronDown
                              className={
                                member.role === "USER"
                                  ? `h-4 w-4 text-black`
                                  : `hidden`
                              }
                            />
                          </div>
                        )}
                      </button>

                      {statusModalOpen === member.id &&
                        member.role === "USER" && (
                          <div className="absolute top-10 left-120 p-3 z-10 border border-gray-500 rounded-lg bg-white shadow-300 ">
                            <div className="cursor-pointer mb-2 space-y-6">
                              {isUpdateStatusPending ? (
                                "Updating..."
                              ) : isUpdateStatusSuccess ? (
                                "Updated"
                              ) : (
                                <div>
                                  <button
                                    className={`${
                                      member.status === "ACTIVE"
                                        ? "hidden"
                                        : "text-green-600 mb-2 flex items-center gap-1"
                                    }`}
                                    onClick={() =>
                                      updateStatus({
                                        id: member.id,
                                        status: "ACTIVE",
                                      })
                                    }
                                  >
                                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                                    Change to active
                                  </button>
                                  <button
                                    className={`${
                                      member.status === "INACTIVE"
                                        ? "hidden"
                                        : "text-yellow-600 mb-2 flex items-center gap-1"
                                    }`}
                                    onClick={() =>
                                      updateStatus({
                                        id: member.id,
                                        status: "INACTIVE",
                                      })
                                    }
                                  >
                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                    Change to inactive
                                  </button>
                                  <p
                                    className={`${
                                      member.status === "DELETED"
                                        ? "hidden"
                                        : "text-blue-600 mb-2 flex items-center gap-1"
                                    }`}
                                    onClick={() =>
                                      updateStatus({
                                        id: member.id,
                                        status: "DELETED",
                                      })
                                    }
                                  >
                                    <Trash2 className="h-3 w-3" />
                                    Change to deleted
                                  </p>
                                  <p
                                    className={`${
                                      member.status === "BLOCKED"
                                        ? "hidden"
                                        : "text-red-600 mb-2 flex items-center gap-1"
                                    }`}
                                    onClick={() =>
                                      updateStatus({
                                        id: member.id,
                                        status: "BLOCKED",
                                      })
                                    }
                                  >
                                    <Ban className="h-3 w-3" />
                                    Change to blocked
                                  </p>
                                </div>
                              )}
                            </div>
                            <p
                              onClick={() => statusModaltoggle("")}
                              className="cursor-pointer text-red-400 flex items-center gap-1 font-medium"
                            >
                              <X className="h-4 w-4" />
                              Close
                            </p>
                          </div>
                        )}
                    </TableCell>
                    <TableCell className="">
                      <p>{member._count?.Idea}</p>
                    </TableCell>

                    <TableCell>{member.isSubscribed ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div>
              <Pagination
                data={members?.data?.data}
                meta={members?.data?.meta}
                page={page}
                setPage={setPage}
                limit={limit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
