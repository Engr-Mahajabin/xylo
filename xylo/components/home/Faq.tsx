"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    id: "01",
    question: "What does a project at Xylo cost?",
    answer:
      "Fixed price after a brief discovery call. Front-end builds and custom web platforms start around $1,500; complex software architectures are scoped individually. No hourly billing, no hidden surprises—you know the exact investment before we write a single line of code.",
  },
  {
    id: "02",
    question: "How long does a project take?",
    answer:
      "A standard modern frontend platform usually takes 2 to 4 weeks. Full-stack solutions or complex web applications can take 6 to 8 weeks depending on the required architecture, integrations, and testing cycles.",
  },
  {
    id: "03",
    question: "Which technologies do you use?",
    answer:
      "We build performance-driven interfaces utilizing React.js, Next.js, and Tailwind CSS for scalable frontend architectures. For motion design and animations, we rely heavily on Framer Motion and modern UI libraries like Shadcn UI.",
  },
  {
    id: "04",
    question: "Do you build full-stack or frontend only?",
    answer:
      "While we specialize heavily in premium frontend design and interactive UI development, we also build comprehensive full-stack solutions using the MERN stack (MongoDB, Express.js, React, Node.js) paired with Next.js Server Actions.",
  },
  {
    id: "05",
    question: "Who works on the project — a team or one person?",
    answer:
      "You will work directly with a dedicated software engineer and designer. We avoid agency layers and miscommunications, providing direct technical consulting to ensure your platform's performance meets enterprise standards.",
  },
  {
    id: "06",
    question: "Do I get the source code and full access?",
    answer:
      "Absolutely. Once the project is complete and finalized, you receive 100% ownership of the repository. This includes full access to your GitHub codebase, deployment configurations (Vercel/Netlify), and all raw design assets.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // প্রথমটি ডিফল্ট ওপেন থাকবে যেমন ছবিতে আছে

  return (
    <section className="bg-[#030303] text-white py-32 px-6 select-none overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* top subtitle */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-[1px] bg-[#E1B816]" />
          <span className="text-[#E1B816]">[01]</span>
          <span className="text-white/60 uppercase">Frequently Asked</span>
        </div>

        {/* main title */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-sans">
          Answers{" "}
          <span className="italic font-serif text-[#E1B816]">up front.</span>
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
