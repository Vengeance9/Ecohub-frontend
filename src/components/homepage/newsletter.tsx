"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getUserInfoAction, subscribeAction } from "@/_actions/auth.action";
import { errorHandler, successHandler } from "@/lib/onSuccess";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const {
    mutate: subscribe,
    error: subscribeError,
    isPending,
  } = useMutation({
    mutationFn: async (email: string) => subscribeAction(email),
    onSuccess: () =>
      successHandler({
        setMessage,
        setMessageType,
        onSuccess: () => setEmail(""),
      }),
    onError: (error: any) =>
      errorHandler({ error, setMessage, setMessageType }),
  });

  const {data:Me,isLoading:isMeLoading} = useQuery({
    queryKey:["user"],
    queryFn:()=>getUserInfoAction()
  })


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }
    subscribe(email);
  };

  return (
    <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with EcoHub
          </h2>

          {/* Description */}
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Get the latest sustainability ideas, top-voted solutions, and
            platform announcements delivered straight to your inbox.
          </p>

          {/* What you'll get - Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <svg
                className="w-4 h-4 text-green-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-100 text-sm">New Ideas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <svg
                className="w-4 h-4 text-green-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-100 text-sm">Top Voted</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <svg
                className="w-4 h-4 text-green-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-100 text-sm">Announcements</span>
            </div>
          </div>

          {/* Newsletter Form */}
          {Me?.isSubscribed ? (
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              You are already subscribed to our newsletter.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  disabled={isPending}
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Message Display */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                messageType === "success"
                  ? "bg-green-800 text-green-100"
                  : "bg-red-500 text-white"
              }`}
            >
              {message}
            </div>
          )}

          {/* Privacy note */}
          
        </div>
      </div>
    </section>
  );
}
