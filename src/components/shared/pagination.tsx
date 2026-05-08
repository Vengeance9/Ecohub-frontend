// import { Button } from "@/components/ui/button";


// export default function Pagination({
//     data,
//     meta,
//     page,
//     setPage,
//     limit
// }: {
//     data: any;
//     meta?: any;
//     page: number;
//     setPage: (page: number) => void;
//     limit?:number
// }) {
//       limit = limit || 10;
//       const totalPages = data ? Math.ceil(meta.total / limit) : 0;
//       let buttons = [];
//       let i = 1;
//       while (i <= totalPages) {
//         buttons.push(i);
//         i++;
//       }
//       return (
//         <div>
//           <div>
//             {page > 1 && (
//               <Button
//                 onClick={() => setPage(page - 1)}
//                 className={`px-2 mx-2 rounded-lg cursor-pointer border border-gray-400`}
//               >
//                 {" "}
//                 Prev{" "}
//               </Button>
//             )}
//             {buttons.map((button) => {
//               return (
//                 <Button
//                   key={button}
//                   onClick={() => setPage(button)}
//                   className={`px-2 mx-2 rounded-lg cursor-pointer   ${
//                     page === button
//                       ? "bg-green-500 text-white"
//                       : "border border-gray-400"
//                   }`}
//                 >
//                   {button}
//                 </Button>
//               );
//             })}
//             {page < totalPages && (
//               <Button
//                 onClick={() => setPage(page + 1)}
//                 className={`px-2 mx-2 rounded-lg cursor-pointer border border-gray-400`}
//               >
//                 {" "}
//                 Next{" "}
//               </Button>
//             )}
//           </div>
//         </div>
//       );
// }

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function Pagination({
  data,
  meta,
  page,
  setPage,
  limit,
}: {
  data: any;
  meta?: any;
  page: number;
  setPage: (page: number) => void;
  limit?: number;
}) {
  limit = limit || 5;
  const totalPages = data ? Math.ceil(meta.total / limit) : 0;

  // Show limited page numbers (max 5)
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (page >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [page - 2, page - 1, page, page + 1, page + 2];
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-4">
      {/* Previous Button */}
      <Button
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* First Page */}
      {visiblePages[0] > 1 && (
        <>
          <Button
            onClick={() => setPage(1)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 min-w-[40px]"
          >
            1
          </Button>
          {visiblePages[0] > 2 && (
            <span className="px-2 text-gray-400">
              <MoreHorizontal className="w-4 h-4" />
            </span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {visiblePages.map((button) => (
        <Button
          key={button}
          onClick={() => setPage(button)}
          className={`px-3 py-2 rounded-lg transition-all duration-200 min-w-[40px] ${
            page === button
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {button}
        </Button>
      ))}

      {/* Last Page */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-400">
              <MoreHorizontal className="w-4 h-4" />
            </span>
          )}
          <Button
            onClick={() => setPage(totalPages)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 min-w-[40px]"
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next Button */}
      <Button
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}