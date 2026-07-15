"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import { projectsData } from "@/data/projectsData";

export default function Projects() {
  // হোম পেজের জন্য প্রথম ৪টি প্রজেক্ট স্লাইস
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <section
      id="works"
      className="relative w-full bg-black text-white overflow-hidden py-24 md:py-32 px-6 md:px-20 font-sans"
    >
      {/* ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট নিওন গ্লো ইফেক্ট */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E1B816]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ─── হেডার ট্যাগলাইন ও টাইটেল (হিরো সেকশনের সাথে ম্যাচড) ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 text-xs font-bold uppercase tracking-[0.25em] text-[#E1B816]"
            >
              <div className="w-12 h-[1px] bg-[#E1B816]" />
              <span>[03]</span>
              <span className="text-white/60">
                OUR PRODUCTS & SELECTED WORKS
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-xl"
            >
              What We've{" "}
              <span className="text-[#E1B816] font-blackops font-light">
                Built.
              </span>
            </motion.h2>
          </div>
        </div>

        {/* ─── ওলিও লেআউটের প্রিমিয়াম ডার্ক গ্রিড ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => {
            const isFullWidthRow = index === 0 || index === 1;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${isFullWidthRow ? "md:col-span-2" : "md:col-span-1"}`}
              >
                <Link
                  href={project.liveLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-[#E1B816]/30 hover:bg-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] h-full"
                >
                  <div
                    className={`grid grid-cols-1 ${isFullWidthRow ? "lg:grid-cols-12 items-center" : ""} h-full`}
                  >
                    {/* টেক্সট এরিয়া */}
                    <div
                      className={`p-8 md:p-12 flex flex-col justify-between h-full ${isFullWidthRow ? "lg:col-span-5" : ""}`}
                    >
                      <div>
                        <span className="text-xs font-mono text-zinc-500 block mb-2 group-hover:text-[#E1B816]/60 transition-colors duration-300">
                          {project.id}
                        </span>

                        <h3 className="text-3xl font-extrabold tracking-tight text-white mb-2 group-hover:text-[#E1B816] transition-colors duration-300 flex items-center gap-2">
                          {project.title}
                          <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-[#E1B816]" />
                        </h3>

                        <p className="text-sm font-medium text-zinc-400 mb-4">
                          {project.category}
                        </p>

                        {project.badge && (
                          <span className="inline-block bg-[#E1B816]/10 text-[#E1B816] border border-[#E1B816]/20 text-xs font-bold px-3 py-1.5 rounded-xl mb-6">
                            {project.badge}
                          </span>
                        )}

                        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm group-hover:text-zinc-300 transition-colors duration-300">
                          {project.stack}
                        </p>
                      </div>
                    </div>

                    {/* ইমেজ এরিয়া */}
                    <div
                      className={`relative bg-zinc-950 overflow-hidden border-t lg:border-t-0 border-white/10 ${
                        isFullWidthRow
                          ? "lg:col-span-7 aspect-[16/10]"
                          : "aspect-[16/11]"
                      }`}
                    >
                      {/* ডার্ক সিনেমাটিক ওভারলে */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top opacity-75 group-hover:opacity-90 scale-100 group-hover:scale-102 transition-all duration-700"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ─── এক্সপ্লোর বাটন (হিরো সেকশনের মেইন ActionButton-এর সাথে ম্যাচড) ─── */}
        <div className="text-center mt-16">
          <Link href="/projects" className="inline-block group">
            <ActionButton className="rounded-xl px-8 py-4 text-sm font-bold flex items-center space-x-2">
              <span>Explore other works</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ActionButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
