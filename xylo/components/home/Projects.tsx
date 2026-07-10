"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// ডামি প্রজেক্ট ডাটা (আপনার প্রজেক্টের সাথে চেঞ্জ করে নিবেন)
const projectsData = [
  {
    id: "01",
    title: "Construction Helmet",
    category: "Frontend Web Development",
    stack: "Next.js · Tailwind CSS · Framer Motion",
    image: "/project1.png", // আপনার ইমেজ পাথ
    liveLink: "#",
  },
  {
    id: "02",
    title: "Bistro Boss Restaurant",
    category: "Fullstack MERN Platform",
    stack: "React.js · Node.js · MongoDB · Tailwind",
    image: "/project2.png",
    liveLink: "#",
  },
];

export default function Projects() {
  return (
    <section id="works" className="bg-black text-white py-24 md:py-32 px-6 md:px-20 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ─── হেডার ট্যাগলাইন ও টাইটেল (আপনার অন্য সেকশনের মতো এক লাইনে) ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-28">
          <div>
            <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-[0.25em] text-[#E1B816] mb-6">
              <div className="w-12 h-[1px] bg-[#E1B816]" aria-hidden="true" />
              <span>[03]</span>
              <span className="text-white/40">Selected Works</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white max-w-xl leading-tight">
              What We've{" "}
              <span className="text-[#E1B816] font-blackops font-light italic">
                Built.
              </span>
            </h2>
          </div>
        </div>

        {/* ─── প্রজেক্ট লিস্ট কন্টেইনার ─── */}
        <div className="space-y-24 md:space-y-36">
          {projectsData.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center group"
              >
                {/* প্রজেক্ট ইমেজ (অল্টারনেটিং লেআউট) */}
                <div
                  className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="relative aspect-[16/10] w-full bg-zinc-900 border border-white/[0.06] rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-500 group-hover:border-[#E1B816]/20">
                    {/* ইমেজ হোভার ইফেক্ট */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover scale-100 group-hover:scale-102 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* প্রজেক্ট ডিটেইলস টেক্সট */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="flex items-center gap-3 text-[#E1B816] text-xs font-bold uppercase tracking-wider mb-4">
                    <span>[{project.id}]</span>
                    <span className="text-white/30">•</span>
                    <span className="text-zinc-400">{project.category}</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-normal text-white mb-4 tracking-tight group-hover:text-[#E1B816] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-zinc-500 text-sm mb-6 max-w-md font-light leading-relaxed">
                    {project.stack}
                  </p>

                  <div>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/60 hover:text-[#E1B816] transition-colors duration-300 group/link"
                    >
                      View Live Project
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
