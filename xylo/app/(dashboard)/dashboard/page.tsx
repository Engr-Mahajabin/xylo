"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardStats {
  projects: any[];
  blogs: any[];
  testimonials: any[];
}

export default function DashboardOverview() {
  const [data, setData] = useState<DashboardStats>({
    projects: [],
    blogs: [],
    testimonials: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [projRes, blogRes, testRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/blogs"),
          fetch("/api/testimonials"),
        ]);

        const projects = projRes.ok ? await projRes.json() : [];
        const blogs = blogRes.ok ? await blogRes.json() : [];
        const testimonials = testRes.ok ? await testRes.json() : [];

        // API Response Array নাকি Object (e.g. { data: [...] }) তা Handle করা
        const getList = (resData: any) => {
          if (Array.isArray(resData)) return resData;
          if (Array.isArray(resData?.data)) return resData.data;
          if (Array.isArray(resData?.projects)) return resData.projects;
          return [];
        };

        setData({
          projects: getList(projects),
          blogs: getList(blogs),
          testimonials: getList(testimonials),
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const cards = [
    {
      title: "Total Projects",
      count: data.projects.length,
      href: "/dashboard/projects",
      icon: "📁",
      color: "border-yellow-500/20 text-yellow-500 bg-yellow-500/10",
      subtitle: "Showcased Work",
    },
    {
      title: "Total Articles",
      count: data.blogs.length,
      href: "/dashboard/blogs",
      icon: "📝",
      color: "border-yellow-500/20 text-yellow-500 bg-yellow-500/10",
      subtitle: "Published Blogs",
    },
    {
      title: "Testimonials",
      count: data.testimonials.length,
      href: "/dashboard/testimonials",
      icon: "💬",
      color: "border-yellow-500/20 text-yellow-500 bg-yellow-500/10",
      subtitle: "Client Reviews",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500/10 via-zinc-900 to-zinc-900 border border-yellow-500/20 rounded-2xl p-6 md:p-8">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-semibold uppercase tracking-wider">
            ⚡ System Active
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider font-[family-name:var(--font-black-ops)] text-white">
            Admin <span className="text-yellow-500">Overview</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl">
            Quick summary of your platform's dynamic contents. Manage your
            portfolio data effortlessly.
          </p>
        </div>
      </div>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className="bg-[#09090b] border border-zinc-800 hover:border-yellow-500/50 p-6 rounded-2xl shadow-xl transition group relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center">
                <span className={`p-3 rounded-xl border text-xl ${card.color}`}>
                  {card.icon}
                </span>
                <span className="text-zinc-500 group-hover:text-white transition text-sm">
                  ↗
                </span>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                  {card.title}
                </p>
                <h3 className="text-4xl font-extrabold text-white mt-2 group-hover:text-yellow-500 transition">
                  {loading ? "..." : card.count}
                </h3>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex justify-between items-center text-xs">
              <span className="text-zinc-500">{card.subtitle}</span>
              <span className="text-yellow-500 font-semibold group-hover:underline">
                Manage &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* 3. Quick Actions & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects Preview */}
        <div className="lg:col-span-2 bg-[#09090b] border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Projects Added
            </h2>
            <Link
              href="/dashboard/projects"
              className="text-xs text-yellow-500 hover:underline"
            >
              View All
            </Link>
          </div>

          {loading ? (
            <p className="text-xs text-zinc-500">Loading recent projects...</p>
          ) : data.projects.length === 0 ? (
            <p className="text-xs text-zinc-500">No projects found.</p>
          ) : (
            <div className="space-y-3">
              {data.projects.slice(0, 3).map((item: any, idx: number) => (
                <div
                  key={item._id || idx}
                  className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {item.title || "Untitled Project"}
                      </h4>
                      <p className="text-xs text-zinc-500">
                        {item.badge || "Project"}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/projects"
                    className="text-xs text-zinc-400 hover:text-white underline"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Action Shortcuts */}
        <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/projects"
              className="block w-full text-center py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl text-xs uppercase tracking-wider transition"
            >
              + Add New Project
            </Link>
            <Link
              href="/dashboard/blogs"
              className="block w-full text-center py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-medium rounded-xl text-xs transition"
            >
              + Create Blog Post
            </Link>
            <Link
              href="/dashboard/testimonials"
              className="block w-full text-center py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-medium rounded-xl text-xs transition"
            >
              + Add Testimonial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
