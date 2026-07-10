"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    id: "01",
    question: "What services do you offer?",
    answer:
      "We design and develop business websites, custom software, SaaS products, AI-powered solutions, mobile applications, and digital branding tailored to your business goals.",
  },
  {
    id: "02",
    question: "How much does a project cost?",
    answer:
      "Every project is unique. After a short discovery call, we provide a fixed-price proposal based on your requirements, timeline, and scope—no hidden fees or hourly surprises.",
  },
  {
    id: "03",
    question: "How long does a project take?",
    answer:
      "Project timelines depend on complexity. Most business websites take 2–4 weeks, while custom software and SaaS platforms typically take 6–12 weeks.",
  },
  {
    id: "04",
    question: "Can you build custom software for my business?",
    answer:
      "Yes. We build custom software tailored to your workflow, including internal tools, dashboards, CRM systems, booking platforms, SaaS applications, and AI-powered solutions.",
  },
  {
    id: "05",
    question: "Do you provide support after launch?",
    answer:
      "Absolutely. We offer post-launch support, maintenance, performance optimization, bug fixes, and future feature development to keep your product running smoothly.",
  },
  {
    id: "06",
    question: "Will I own the source code and project assets?",
    answer:
      "Yes. Once the project is completed and payment is finalized, you'll receive full ownership of the source code, deployment, documentation, and all project assets.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-[#030303] text-white py-32 px-6 select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* top subtitle */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-[1px] bg-[#E1B816]" />
          <span className="text-[#E1B816]">[06]</span>
          <span className="text-white/60 uppercase">Frequently Asked</span>
        </div>

        {/* main title */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-sans">
          Answers{" "}
          <span className="font-blackops font-light text-[#E1B816]">
            Up Front.
          </span>
        </h2>

        {/* description snippet */}
        <p className="text-zinc-500 text-sm max-w-md mb-20 leading-relaxed">
          Six answers to the questions we get asked most frequently — clear and
          straight to the point.
        </p>

        {/* accordion list */}
        <div className="border-t border-zinc-800/60">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                className="border-b border-zinc-800/60 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-7 text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-6 md:gap-12 pr-4">
                    {/* id number */}
                    <span className="text-[11px] font-mono tracking-wider text-[#E1B816] opacity-80">
                      {item.id}
                    </span>
                    {/* question */}
                    <span className="text-base md:text-lg font-medium text-zinc-200 group-hover:text-white transition-colors duration-200">
                      {item.question}
                    </span>
                  </div>

                  {/* icon (+ / -) */}
                  <div className="relative w-4 h-4 flex items-center justify-center flex-shrink-0">
                    {/* horizontal bar */}
                    <div
                      className={`absolute w-3.5 h-[1.5px] bg-zinc-400 group-hover:bg-white transition-colors duration-200 ${isOpen ? "bg-[#E1B816] group-hover:bg-[#E1B816]" : ""}`}
                    />
                    {/* vertical bar */}
                    <motion.div
                      animate={{
                        rotate: isOpen ? 90 : 0,
                        opacity: isOpen ? 0 : 1,
                      }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="absolute w-[1.5px] h-3.5 bg-zinc-400 group-hover:bg-white"
                    />
                  </div>
                </button>

                {/* animated answer section */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-16 pb-8 pr-6 md:pr-16 text-zinc-400 text-sm leading-relaxed max-w-2xl font-light">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
