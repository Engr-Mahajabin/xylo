"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogs, getPopularBlogs } from "@/services/blogService";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [allBlogsData, popularData] = await Promise.all([
          getBlogs(),
          getPopularBlogs(),
        ]);
        setBlogs(allBlogsData);
        setPopularBlogs(popularData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading blogs...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Main Blog List */}
      <div className="md:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
        {blogs.map((blog) => (
          <div
            key={blog.id || blog.slug}
            className="p-5 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 line-clamp-3 mb-4">
              {blog.content || blog.summary}
            </p>
            <Link
              href={`/blogs/${blog.slug}`}
              className="text-blue-600 hover:underline font-medium"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>

      {/* Popular Blogs Sidebar */}
      <div className="space-y-4 border-l pl-6">
        <h2 className="text-2xl font-bold mb-4">Popular Blogs 🔥</h2>
        {popularBlogs.map((popBlog) => (
          <div
            key={popBlog.id || popBlog.slug}
            className="p-3 bg-gray-50 rounded"
          >
            <Link
              href={`/blogs/${popBlog.slug}`}
              className="font-semibold hover:text-blue-600"
            >
              {popBlog.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
