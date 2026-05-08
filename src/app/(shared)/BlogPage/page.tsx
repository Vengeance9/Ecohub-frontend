"use client";
import Link from "next/link";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Simple Ways to Reduce Plastic Waste Today",
      description:
        "Small changes in your daily routine can make a big impact. Discover easy swaps for plastic items you use every day.",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Waste Reduction",
      icon: "🥤",
    },
    {
      id: 2,
      title: "How to Start a Community Solar Project",
      description:
        "A step-by-step guide to bringing solar energy to your neighborhood. From planning to execution.",
      date: "March 10, 2024",
      readTime: "8 min read",
      category: "Energy",
      icon: "☀️",
    },
    {
      id: 3,
      title: "The Ultimate Guide to Composting at Home",
      description:
        "Turn your kitchen scraps into nutrient-rich soil. Learn what to compost and how to get started.",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Waste Management",
      icon: "🌱",
    },
    {
      id: 4,
      title: "Electric Vehicles: Myths vs Facts",
      description:
        "Separating truth from fiction about EV ownership, charging, and environmental impact.",
      date: "February 28, 2024",
      readTime: "7 min read",
      category: "Transportation",
      icon: "🚗",
    },
    {
      id: 5,
      title: "Success Story: How One Member Reduced Office Waste by 80%",
      description:
        "Interview with an EcoHub member who transformed their workplace sustainability practices.",
      date: "February 20, 2024",
      readTime: "4 min read",
      category: "Success Stories",
      icon: "🏆",
    },
    {
      id: 6,
      title: "Sustainable Fashion on a Budget",
      description:
        "Look good while being eco-friendly. Tips for thrifting, clothing swaps, and ethical brands.",
      date: "February 15, 2024",
      readTime: "6 min read",
      category: "Lifestyle",
      icon: "👕",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            EcoHub Blog
          </h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto">
            Insights, tips, and stories to help you live more sustainably
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                {/* Icon and Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{post.icon}</span>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Read More Link */}
                <button className="mt-4 text-green-600 text-sm font-semibold hover:text-green-700 transition-colors inline-flex items-center gap-1">
                  Read More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Coming Soon Banner */}
        <div className="mt-12 bg-green-50 rounded-xl p-6 text-center border border-green-200">
          <p className="text-green-700">
            📝 New blog posts added weekly.
            <Link
              href="/newsletter"
              className="font-semibold underline ml-1 hover:text-green-800"
            >
              Subscribe to get notified!
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
