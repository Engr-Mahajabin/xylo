"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ProcessStep } from "@/data/processData";

interface ProcessCardProps {
  step: ProcessStep;
  index: number;
  totalCards: number;
}

export default function ProcessCard({
  step,
  index,
  totalCards,
}: ProcessCardProps) {
  const container = useRef<HTMLDivElement>(null);

  // কার্ডের নিজস্ব স্ক্রোল প্রগ্রেস ট্র্যাকিং
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // ওপরের দিকে স্ট্যাক হওয়ার সময় হালকা স্কেল ডাউন হওয়া (যেমন ১ থেকে ০.৯৫)
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (totalCards - index) * 0.02],
  );

  return (
    <div
      ref={container}
      // `sticky top-36` এর মাধ্যমে প্রতিটি কার্ড স্ক্রিনের ওপরের নির্দিষ্ট দূরত্বে আটকে যাবে
      className="sticky top-32 md:top-40 w-full flex justify-center pb-12 md:pb-24"
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-7xl bg-[#0d0d0d] border border-white/10 rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[450px] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Left Side: Visual/Image Area */}
        <div className="relative bg-[#090909] p-8 md:p-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
          <div className="relative w-full aspect-square max-w-[320px] transition-transform duration-700 hover:scale-105">
            <Image
              src={step.imageSrc}
              alt={step.title}
              fill
              className="object-contain opacity-80"
              priority={index === 0}
            />
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="p-8 md:p-16 flex flex-col justify-center relative">
          {/* Step Indicator (e.g., 01 / 04) */}
          <div className="text-xs font-mono font-bold tracking-widest text-[#E1B816] mb-6">
            {step.id} <span className="text-white/20">/</span> {step.total}
          </div>

          {/* Heading */}
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md mb-8">
            {step.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] md:text-xs font-mono uppercase tracking-wider text-zinc-500">
            {step.tags.map((tag, idx) => (
              <span key={idx} className="flex items-center">
                <span className="inline-block w-1 h-1 bg-[#E1B816] rounded-full mr-2" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
