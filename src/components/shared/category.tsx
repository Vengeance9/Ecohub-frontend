"use client";
import { getCategoriesAction } from "@/_actions/category.action";
//import { getCategories } from "@/services/category.services";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Category({
  category,
  setCategory,
}: {
  category: string;
  setCategory: any;
}) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesAction(),
  });
  console.log("THIS IS THE DATA WHICH IS ", data);
  console.log("ERROR", error);
  console.log("IS LOADING", isLoading);

  return (
    <div className="w-full mb-4">
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <div className="text-gray-500">Loading categories...</div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Categories
          </h1>
          <div className="flex flex-wrap gap-2">
            {data?.data?.map((cat: any) => (
              <div
                key={cat.id}
                onClick={() => {
                  category === cat.id
                    ? setCategory("")
                    : setCategory(cat.id);
                }}
                className={`px-4 py-2 cursor-pointer transition-all duration-200 rounded-lg border ${
                  category === cat.id
                    ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
