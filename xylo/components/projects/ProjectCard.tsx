"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  badge?: string;
  stack: string;
  image: string;
  liveLink?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isFullWidthRow: boolean;
}

export default function ProjectCard({
  project,
  index,
  isFullWidthRow,
}: ProjectCardProps) {
  return (
    <>
      {/* ─── ট্রিক: শুধু প্রথম প্রজেক্টের (index === 0) ওপরে শর্ট হেডিংটি রেন্ডার হবে ─── */}
      {index === 0 && (
        <div className="relative z-10 text-left mb-10 max-w-5xl pl-2 col-span-1 md:col-span-2 pt-30">
          {/* ছোট লিয়ার Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4 space-x-3 text-xs font-bold uppercase tracking-[0.25em]"
          >
            <div className="w-12 h-[1px] bg-[#E1B816]" />
            <span>[02]</span>
            <span className="text-white/60">PORTFOLIO</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-2xl leading-tight">
            Selected{" "}
            <span className="text-[#E1B816] font-blackops font-light">
              Works
            </span>
          </h2>
        </div>
      )}

      {/* ─── প্রজেক্ট কার্ডের মেইন ডিজাইন ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        className={isFullWidthRow ? "md:col-span-2" : "md:col-span-1"}
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
            {/* টেক্সট এরিয়া */}
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

            {/* ইমেজ এরিয়া */}
            <div
              className={`relative bg-zinc-950 overflow-hidden border-t lg:border-t-0 border-white/10 ${
                isFullWidthRow
                  ? "lg:col-span-7 aspect-[16/10]"
                  : "aspect-[16/11]"
              }`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top opacity-75 group-hover:opacity-90 scale-100 group-hover:scale-102 transition-all duration-700"
                priority={isFullWidthRow}
              />
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
