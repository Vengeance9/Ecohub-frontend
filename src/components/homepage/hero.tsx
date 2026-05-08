import Image from "next/image";
import SearchBar from "../shared/searchbar";
import Category from "../shared/category";
import Items from "../shared/Items";

export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto px-4 py-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Cultivating Change, One <span className="text-green-600">Idea</span>{" "}
            at a Time.
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Discover amazing ideas and bring your vision to life
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <Image
              src="/ECO.webp"
              alt="Hero"
              width={500}
              height={500}
              className="rounded-lg object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <Items />
    </div>
  );
}
