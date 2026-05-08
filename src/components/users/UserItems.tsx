import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function UserItems({
  data,
  meta,
  page,
  setPage,
}: {
  data: any;
  meta?: any;
  page: number;
  setPage: (page: number) => void;
}) {
  const limit = 10;
  const totalPages = data ? Math.ceil(meta.total / limit) : 0;
  let buttons = [];
  let i = 1;
  while (i <= totalPages) {
    buttons.push(i);
    i++;
  }
  //console.log("DATA IN REUSABLE ITEM", data);
  return (
    <div>
      <div className="grid grid-cols-3 gap-6  pb-4">
        {data.map((idea: any) => (
          <div
            key={idea.id}
            className="flex flex-col gap-3 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow min-w-[280px] flex-shrink-0 bg-white"
          >
            <div className="relative w-full h-48">
              <Image
                src={idea.photo}
                alt={idea.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-gray-800 font-medium">{idea.title}</p>
              <p className="text-gray-600">{idea.isPaid ? "Paid" : "Free"}</p>
            </div>
            <div>
              <Link
                href={`/ideaDetails/paid/${idea.id}`}
                className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div>
          {page > 1 && (
            <Button
              onClick={() => setPage(page - 1)}
              className={`px-2 mx-2 rounded-lg cursor-pointer border border-gray-400`}
            >
              {" "}
              Prev{" "}
            </Button>
          )}
          {buttons.map((button) => {
            return (
              <Button
                key={button}
                onClick={() => setPage(button)}
                className={`px-2 mx-2 rounded-lg cursor-pointer   ${
                  page === button
                    ? "bg-green-500 text-white"
                    : "border border-gray-400"
                }`}
              >
                {button}
              </Button>
            );
          })}
          {page < totalPages && (
            <Button
              onClick={() => setPage(page + 1)}
              className={`px-2 mx-2 rounded-lg cursor-pointer border border-gray-400`}
            >
              {" "}
              Next{" "}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
