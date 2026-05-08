"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About EcoHub
          </h1>
          <p className="text-green-100 text-lg md:text-xl">
            Empowering communities to create a sustainable future, one idea at a
            time
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg leading-relaxed">
            To provide a platform where community members can share, discover,
            and implement sustainable ideas that help protect our planet for
            future generations.
          </p>
        </div>

        {/* What We Do */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-semibold text-lg mb-2">Share Ideas</h3>
              <p className="text-gray-600 text-sm">
                Members submit sustainability ideas across Energy, Waste, and
                Transportation categories
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-3">🗳️</div>
              <h3 className="font-semibold text-lg mb-2">Vote & Discuss</h3>
              <p className="text-gray-600 text-sm">
                Community votes on the best solutions and provides feedback
                through comments
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-semibold text-lg mb-2">Expert Review</h3>
              <p className="text-gray-600 text-sm">
                Admins review submissions to ensure quality and feasibility
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Our Values
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
              <span className="text-2xl">🌍</span>
              <div>
                <h3 className="font-semibold">Sustainability First</h3>
                <p className="text-gray-600 text-sm">
                  Every idea should have a positive environmental impact
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
              <span className="text-2xl">🤝</span>
              <div>
                <h3 className="font-semibold">Community Driven</h3>
                <p className="text-gray-600 text-sm">
                  Powered by member contributions and collaboration
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
              <span className="text-2xl">🔬</span>
              <div>
                <h3 className="font-semibold">Evidence Based</h3>
                <p className="text-gray-600 text-sm">
                  Ideas backed by research and feasibility studies
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
              <span className="text-2xl">🔄</span>
              <div>
                <h3 className="font-semibold">Transparent</h3>
                <p className="text-gray-600 text-sm">
                  Clear feedback and open decision making
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-green-600 rounded-xl p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-green-100">Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm text-green-100">Ideas Shared</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-green-100">Approved Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold">10k+</div>
              <div className="text-sm text-green-100">Votes Cast</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                👩
              </div>
              <h3 className="font-semibold">Sarah Johnson</h3>
              <p className="text-gray-500 text-sm">Founder & Director</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                👨
              </div>
              <h3 className="font-semibold">Michael Chen</h3>
              <p className="text-gray-500 text-sm">Sustainability Lead</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                👩
              </div>
              <h3 className="font-semibold">Emma Rodriguez</h3>
              <p className="text-gray-500 text-sm">Community Manager</p>
            </div>
          </div>
        </div>

        {/* Join CTA */}
        <div className="bg-gray-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Join Our Community
          </h2>
          <p className="text-gray-600 mb-6">
            Be part of the solution. Share your ideas and help build a
            sustainable future.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Sign Up Free
              </button>
            </Link>
            <Link href="/ideas">
              <button className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors">
                Explore Ideas
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
