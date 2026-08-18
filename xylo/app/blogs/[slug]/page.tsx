"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { blogService } from "@/features/blogs/blogService";
import { BlogPost } from "@/features/blogs/blog.types";

export default function SingleBlogPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const [singleData, listData] = await Promise.all([
          blogService.getBlogBySlug(slug),
          blogService.getAllBlogs(),
        ]);
        setBlog(singleData);
        setAllBlogs(listData);
      } catch (err) {
        console.error("Failed to load article:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#030303] text-white flex items-center justify-center text-sm text-zinc-500">
        Loading article details...
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400 text-sm">Article not found.</p>
        <Link
          href="/blogs"
          className="text-xs font-bold text-[#E1B816] border border-[#E1B816]/30 px-4 py-2 rounded-lg hover:bg-[#E1B816]/10 transition"
        >
          ← Back to Blogs
        </Link>
      </main>
    );
  }

  const imageUrl = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `${process.env.NEXT_PUBLIC_API_URL || ""}${blog.image}`
    : null;

  const recentPosts = allBlogs.filter((b) => b.id !== blog.id).slice(0, 4);
  const relatedPosts = allBlogs.filter((b) => b.id !== blog.id).slice(0, 3);
  const tagsList = blog.tags
    ? blog.tags.split(",")
    : ["Tech", "Engineering", "Web"];

  return (
    <main className="min-h-screen bg-[#030303] text-white py-40 px-6 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#E1B816] mb-8 hover:underline"
        >
          ← Back to Blogs
        </Link>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ================= LEFT MAIN CONTENT (8 Cols) ================= */}
          <article className="lg:col-span-8">
            {/* Category & Date */}
            <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
              {blog.category && (
                <span className="text-[#E1B816] bg-[#E1B816]/10 px-3 py-1 rounded-full font-medium">
                  {blog.category}
                </span>
              )}
              <span>
                {new Date(
                  blog.published_date || blog.created_at,
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Excerpt / Lead Text */}
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light mb-8">
              {blog.description}
            </p>

            {/* Author Profile */}
            <div className="flex items-center justify-between border-y border-white/[0.08] py-4 mb-8 text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E1B816]/20 border border-[#E1B816]/40 flex items-center justify-center font-bold text-[#E1B816]">
                  {blog.author ? blog.author[0].toUpperCase() : "A"}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {blog.author || "Admin"}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Software Engineer & Author
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-zinc-500">
                <span>
                  💬 {blog.comment_count || blog.comments?.length || 0} Comments
                </span>
                <span>
                  ❤️ {blog.total_reactions || blog.reactions?.length || 0}{" "}
                  Reactions
                </span>
              </div>
            </div>

            {/* Main Featured Image */}
            {imageUrl && (
              <div className="relative w-full h-[320px] md:h-[480px] rounded-2xl overflow-hidden mb-10 bg-zinc-900 border border-white/[0.08]">
                <img
                  src={imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content Body */}
            <div className="text-zinc-300 text-base md:text-lg leading-relaxed space-y-6 font-light mb-12 whitespace-pre-line">
              {blog.description}
            </div>

            {/* Quote Block Highlight (Image Inspiration) */}
            <div className="bg-white/[0.02] border-l-4 border-[#E1B816] p-6 rounded-r-xl mb-12">
              <p className="text-sm md:text-base text-zinc-200 italic font-medium">
                "Continuous learning and adapting modern frontend patterns are
                key to building world-class web applications."
              </p>
            </div>

            {/* Tags Section */}
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-white/[0.08] mb-12">
              <span className="text-xs text-zinc-500 mr-2">Tags:</span>
              {tagsList.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-zinc-900 border border-white/10 text-zinc-300 px-3 py-1 rounded-md"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>

            {/* Bottom Callout Card */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Have questions about this topic?
                </h4>
                <p className="text-zinc-400 text-xs font-light">
                  Feel free to reach out or drop a message anytime.
                </p>
              </div>
              <Link
                href="/contact"
                className="bg-[#E1B816] hover:bg-[#c9a312] text-black font-bold text-xs px-6 py-3 rounded-xl transition whitespace-nowrap"
              >
                Get in Touch
              </Link>
            </div>

            {/* Bottom Newsletter Banner */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 border border-white/[0.08] mb-16">
              <h3 className="text-2xl font-bold text-white mb-2">
                Subscribe to Tech Insights
              </h3>
              <p className="text-zinc-400 text-xs font-light mb-6">
                Get notified whenever I publish new tech blogs and breakdowns.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#E1B816] w-full"
                />
                <button className="bg-[#E1B816] text-black font-bold text-xs px-6 py-3 rounded-xl hover:bg-[#c9a312] transition whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </article>

          {/* ================= RIGHT SIDEBAR (4 Cols) ================= */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Widget 1: Quick Overview Card */}
            <div className="bg-white/[0.02] border border-white/[0.08] p-6 rounded-2xl sticky top-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E1B816] mb-4">
                Article Info
              </h3>
              <div className="space-y-3 text-xs border-t border-white/[0.05] pt-4 text-zinc-400">
                <div className="flex justify-between">
                  <span>Author:</span>
                  <span className="text-white font-medium">
                    {blog.author || "Admin"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="text-white font-medium">
                    {blog.category || "General"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Published:</span>
                  <span className="text-white font-medium">
                    {new Date(
                      blog.published_date || blog.created_at,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Widget 2: Recent Articles List */}
            <div className="bg-white/[0.02] border border-white/[0.08] p-6 rounded-2xl">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E1B816] mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E1B816]"></span>{" "}
                Recent Reads
              </h3>
              <div className="flex flex-col divide-y divide-white/[0.05]">
                {recentPosts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blogs/${item.slug || item.id}`}
                    className="py-4 first:pt-0 last:pb-0 group block"
                  >
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
                      {item.category || "Article"}
                    </span>
                    <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-[#E1B816] transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ================= BOTTOM RELATED ARTICLES SECTION ================= */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/[0.08]">
            <h3 className="text-2xl font-bold text-white mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/blogs/${item.slug || item.id}`}
                  className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-white/[0.15] transition group block"
                >
                  <span className="text-[10px] text-[#E1B816] font-bold uppercase tracking-wider block mb-2">
                    {item.category || "Read Next"}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-[#E1B816] transition-colors mb-2 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-zinc-400 text-xs line-clamp-2 font-light">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
