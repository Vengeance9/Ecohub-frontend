"use client";

import { getUserInfoAction } from "@/_actions/auth.action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Activity,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Crown,
  Edit,
  LogOut,
} from "lucide-react";

export default function Profile() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserInfoAction(),
  });

  const user = data;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return {
          icon: Crown,
          color: "bg-purple-100 text-purple-700",
          label: "Administrator",
        };
      default:
        return {
          icon: User,
          color: "bg-blue-100 text-blue-700",
          label: "Member",
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return {
          icon: CheckCircle,
          color: "bg-green-100 text-green-700",
          label: "Active",
        };
      case "BLOCKED":
        return {
          icon: AlertCircle,
          color: "bg-red-100 text-red-700",
          label: "Blocked",
        };
      default:
        return {
          icon: Activity,
          color: "bg-gray-100 text-gray-700",
          label: status,
        };
    }
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
      </div>
    );
  }

  if (error || !user) {
    return <div className="p-6 text-center">Error loading profile</div>;
  }

  const role = getRoleBadge(user.role);
  const status = getStatusBadge(user.status);
  const RoleIcon = role.icon;
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-10">
      {/* ✅ MAIN WRAPPER FIXED */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/"
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-green-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-green-600 to-emerald-600" />

          <div className="px-6 pb-6">
            <div className="flex flex-col items-center -mt-16">
              {/* Avatar FIX */}
              <div className="h-32 w-32 flex-shrink-0 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center border-4 border-white shadow-lg">
                {user.image ? (
                  <img
                    src={user.image}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-4xl font-bold">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold mt-3">{user.name}</h1>

              <div className="flex gap-2 mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${role.color}`}
                >
                  <RoleIcon className="w-3 h-3" />
                  {role.label}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${status.color}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-2 mt-8">
          {/* Left */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="font-semibold text-lg">Personal Info</h2>

            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
            <p>
              <b>Joined:</b> {formatDate(user.createdAt)}
            </p>
          </div>

          {/* Right */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="font-semibold text-lg">Account</h2>

            <p>
              <b>Role:</b> {user.role}
            </p>
            <p>
              <b>Status:</b> {user.status}
            </p>
            <p>
              <b>Subscription:</b> {user.isSubscribed ? "Premium" : "Free"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/profile/edit" className="flex-1">
            <button className="w-full py-3 bg-green-600 text-white rounded-xl">
              Edit Profile
            </button>
          </Link>

          <button className="flex-1 py-3 bg-red-600 text-white rounded-xl">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
