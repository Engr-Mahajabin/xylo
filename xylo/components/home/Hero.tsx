"use client";

import { motion } from "framer-motion";
import ActionButton from "@/components/ui/ActionButton";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col justify-between">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video-poster.jpg"
          className="w-full h-full object-cover opacity-25 scale-105"
        >
          <source src="/images/hero/bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Hero Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 pt-32 md:pt-40 pb-24 flex flex-col items-center justify-center gap-16 w-full my-auto">
        {/* Content Wrapper */}
        <div className="max-w-4xl space-y-8 text-center mx-auto flex flex-col items-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-3 text-xs font-bold uppercase tracking-[0.25em] text-[#E1B816]"
          >
            <div className="w-12 h-[1px] bg-[#E1B816]" />
            <span>[01]</span>
            <span className="text-white/60">Next-Gen Intelligent Systems</span>
          </motion.div>

          {/* Core Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white font-sans max-w-3xl"
          >
            We architect{" "}
            <span className="text-[#E1B816] font-blackops block sm:inline">
              Intelligent Software
            </span>{" "}
            and Neural SaaS ecosystems.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl font-sans leading-relaxed mx-auto"
          >
            Engineering hyper-scalable SaaS products, custom AI/ML integrations,
            proprietary automation tools, and ultra-performance web
            architectures for the modern web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            {/* Hero Main Project Action */}
            <ActionButton className="rounded-xl px-8 py-4 text-sm font-bold">
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ActionButton>

            {/* Selected Work Button */}
            <motion.button
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden border border-white/10 bg-white/5 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center space-x-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#E1B816] animate-pulse" />
              <span>Selected work</span>
            </motion.button>
          </motion.div>
        </div>
      </main>

      {/* Spacing alignment node */}
      <div className="h-10 w-full relative z-10" />
    </section>
  );
}
