"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { blogService } from "@/features/blogs/blogService";
import { BlogCard } from "@/features/blogs/BlogCard";
import { BlogPost } from "@/features/blogs/blog.types";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response: any = await blogService.getAllBlogs();
        console.log("Backend Raw Response:", response);

        // ১. জ্যাঙ্গো প্যাগিনেশন (results) বা ডিরেক্ট অ্যারে হ্যান্ডলিং
        const rawData: BlogPost[] = Array.isArray(response)
          ? response
          : response?.results || [];

        // ২. পাবলিশড পোস্ট ফিল্টারিং (is_published undefined হলেও যেন ব্লক না হয়)
        const publishedBlogs = rawData.filter(
          (b) => b.is_published === true || b.is_published === undefined,
        );

        setBlogs(publishedBlogs.length > 0 ? publishedBlogs : rawData);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ডাটা স্লাইসিং (Featured, Top Reads, and Remaining)
  const featuredBlog = blogs[0];
  const sideBlogs = blogs.slice(1, 4);
  const remainingBlogs = blogs.length > 4 ? blogs.slice(4) : blogs;

  return (
    <main className="min-h-screen bg-[#030303] text-white py-40 px-6 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 text-xs font-bold uppercase tracking-[0.25em] text-[#E1B816] mb-4">
            <div className="w-8 h-[1px] bg-[#E1B816]" />
            <span>[06] BLOGS & ARTICLES</span>
            <div className="w-8 h-[1px] bg-[#E1B816]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Insights and <span className="text-[#E1B816]">Thoughts</span>
          </h1>

          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
            Exploring software engineering, frontend architecture, web
            development trends, and modern tech solutions.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-zinc-500 text-sm">
            Loading articles...
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 text-sm">
            No articles published yet.
          </div>
        ) : (
          <>
            {/* Hero Featured Block */}
            {featuredBlog && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                {/* Main Featured Article */}
                <div className="lg:col-span-8 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 md:p-8 hover:border-white/[0.15] transition-all flex flex-col justify-between group">
                  <div>
                    {featuredBlog.image && (
                      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-6 bg-zinc-900">
                        <img
                          src={
                            featuredBlog.image.startsWith("http")
                              ? featuredBlog.image
                              : `${process.env.NEXT_PUBLIC_API_URL || ""}${featuredBlog.image}`
                          }
                          alt={featuredBlog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                      {featuredBlog.category && (
                        <span className="text-[#E1B816] bg-[#E1B816]/10 px-3 py-1 rounded-full font-medium">
                          {featuredBlog.category}
                        </span>
                      )}
                      <span>
                        {new Date(
                          featuredBlog.published_date ||
                            featuredBlog.created_at,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#E1B816] transition-colors mb-4 leading-tight">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 font-light mb-6">
                      {featuredBlog.description}
                    </p>
                  </div>
                  <Link
                    href={`/blogs/${featuredBlog.slug || featuredBlog.id}`}
                    className="text-[#E1B816] text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                  >
                    Read Full Article →
                  </Link>
                </div>

                {/* Top Reads List */}
                <div className="lg:col-span-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E1B816] mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E1B816]"></span>{" "}
                      Top Reads
                    </h3>
                    <div className="flex flex-col divide-y divide-white/[0.05]">
                      {sideBlogs.map((b) => (
                        <Link
                          key={b.id}
                          href={`/blogs/${b.slug || b.id}`}
                          className="py-4 first:pt-0 last:pb-0 group block"
                        >
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
                            {b.category || "Insight"}
                          </span>
                          <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-[#E1B816] transition-colors line-clamp-2">
                            {b.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/[0.05] text-xs text-zinc-500">
                    Explore all updates below ↓
                  </div>
                </div>
              </div>
            )}

            {/* Newsletter Banner */}
            <div className="my-16 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Stay Updated with New Articles
                </h3>
                <p className="text-zinc-400 text-sm font-light">
                  Get the latest technical breakdowns right in your feed.
                </p>
              </div>
              <div className="flex w-full md:w-auto gap-3">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#E1B816] w-full md:w-64"
                />
                <button className="bg-[#E1B816] hover:bg-[#c9a312] text-black font-bold text-xs px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>

            {/* All Articles Grid */}
            <div>
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <span>All Articles</span>
                <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full font-mono">
                  {remainingBlogs.length}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
