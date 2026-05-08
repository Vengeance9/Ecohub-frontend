"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function SearchBar({ search, setSearch }: any) {

const [localTerm, setLocalTerm] = useState(search);
  const handleSearch = () => {
    setSearch(localTerm)
  };
  const handleKeyDown = (e:React.KeyboardEvent)=>{
    if(e.key === 'Enter'){
        handleSearch()
    }
  }
  return (
    <div className="flex items-center gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          className="pl-9 pr-3 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Search..."
          value={localTerm}
          onChange={(e) => setLocalTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button
        onClick={handleSearch}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
      >
        Search
      </Button>
      <Button
        onClick={() => setSearch('')}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
      >
        Clear
      </Button>
    </div>
  );
}
