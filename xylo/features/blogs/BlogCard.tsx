"use client";

import React from "react";
import Link from "next/link";
import { BlogPost } from "./blog.types";

interface BlogCardProps {
  blog: BlogPost;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  const imageUrl = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `${process.env.NEXT_PUBLIC_API_URL}${blog.image}`
    : null;

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between group cursor-pointer backdrop-blur-md">
      <div>
        {/* Banner Image */}
        {imageUrl ? (
          <div className="relative w-full h-48 overflow-hidden bg-zinc-900">
            <img
              src={imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-zinc-900/50 border-b border-white/5 flex items-center justify-center text-zinc-600 text-xs">
            No Image
          </div>
        )}

        <div className="p-6">
          {/* Category & Date */}
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
            {blog.category && (
              <span className="text-[#E1B816] bg-[#E1B816]/10 px-2.5 py-1 rounded-full font-medium">
                {blog.category}
              </span>
            )}
            <span>
              {new Date(
                blog.published_date || blog.created_at,
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-[#E1B816] transition-colors mb-3 line-clamp-2">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 font-light mb-4">
            {blog.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 pt-0 flex items-center justify-between text-xs border-t border-white/[0.03] mt-auto">
        <span className="text-zinc-500 font-medium">
          By {blog.author || "Admin"}
        </span>
        <Link
          href={`/blogs/${blog.slug || blog.id}`}
          className="text-[#E1B816] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};
