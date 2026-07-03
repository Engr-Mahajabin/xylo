"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicesData } from "@/data/serviceData";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Services() {
  return (
    <section className="relative w-full bg-black text-white px-6 md:px-20 py-24 md:py-32 overflow-hidden font-sans">
      {/* Background Subtle Glow */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none transform-gpu"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #a3e635 0%, transparent 70%)`,
          filter: "blur(140px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Tagline */}
        {/* <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-[0.25em] text-[#a3e635] mb-6">
          <span>[02]</span>
          <span className="text-white/40">Services / What we do</span>
        </div> */}

        <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-[0.25em] text-[#E1B816] mb-6">
          <div className="w-12 h-[1px] bg-[#E1B816]" aria-hidden="true" />{" "}
          <span>[02]</span>
          <span className="text-white/60">Services / What we do</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-2xl leading-tight mb-16 md:mb-24">
          Four{" "}
          <span className="text-[#E1B816] font-blackops">Disciplines,</span>
          <br />
          One <span className="text-[#E1B816] font-blackops">Team.</span>
        </h2>

        {/* Services Grid with Custom Gap and Border Setup */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover="hover"
                className="group relative bg-[#0d0d0d] p-8 md:p-12 flex flex-col justify-between min-h-[380px] rounded-sm transition-all duration-300 border border-white/5 overflow-hidden"
              >
                {/* ─── HOVER BORDER GLOW EFFECTS (ইমেজ অনুযায়ী) ─── */}
                {/* Top Border Glow (ওপরের দিকে বেশি উজ্জ্বল) */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E1B816] to-[#E1B816] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_1px_10px_#E1B816]" />

                {/* Right Border Glow */}
                <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-[#E1B816] via-[#E1B816]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[1px_0_1px_#E1B816]" />

                {/* Left & Bottom Subtle Borders on Hover */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E1B816]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-[#E1B816]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* ─────────────────────────────────────────────── */}

                {/* Content Area */}
                <div>
                  <div className="flex justify-between items-start mb-8">
                    {/* Icon Box */}
                    <div className="p-3 border border-white/10 rounded-lg text-[#E1B816] bg-white/5 transition-colors duration-300 group-hover:border-[#E1B816]/40">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    {/* Big Watermark Number */}
                    <span className="text-5xl md:text-6xl font-bold font-mono tracking-tighter text-zinc-900 select-none transition-colors duration-500 group-hover:text-zinc-800/40">
                      {service.id}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>

                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md mb-8">
                    {service.description}
                  </p>
                </div>

                <div className="mt-auto space-y-6 relative z-10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-zinc-400 border border-white/10 bg-white/5 px-2.5 py-1 rounded transition-colors duration-300 group-hover:border-zinc-800 group-hover:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow Icon with Hover Reveal */}
                  <div className="flex justify-end pt-2">
                    <motion.div
                      variants={{
                        hover: { x: 4 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      className="text-zinc-600 transition-colors duration-300 group-hover:text-[#E1B816]"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
