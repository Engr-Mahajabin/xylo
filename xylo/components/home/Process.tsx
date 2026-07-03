"use client";

import { processData } from "@/data/processData";
import ProcessCard from "./ProcessCard";

export default function Process() {
  return (
    <section className="relative w-full bg-black text-white px-6 md:px-20 py-24 md:py-32 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Tagline (হিরো ও সার্ভিস সেকশনের সাথে ম্যাচিং) */}
        <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-[0.25em] text-[#E1B816] mb-6">
          <div className="w-12 h-[1px] bg-[#E1B816]" aria-hidden="true" />
          <span>[04]</span>
          <span className="text-white/40">Process / How we work</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white max-w-2xl leading-tight mb-20 md:mb-28">
          From{" "}
          <span className="text-[#E1B816] font-blackops font-light">
            Briefing
          </span>{" "}
          to{" "}
          <span className="text-[#E1B816] font-blackops font-light">
            Launch
          </span>
        </h2>

        {/* Stacked Cards Container */}
        <div className="relative w-full flex flex-col items-center">
          {processData.map((step, index) => (
            <ProcessCard
              key={step.id}
              step={step}
              index={index}
              totalCards={processData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
