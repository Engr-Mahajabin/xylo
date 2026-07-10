"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { MarqueeRowProps, row1, row2 } from "@/data/testimonialData";

const MarqueeRow = ({ items, direction = "left" }: MarqueeRowProps) => {
  const duplicatedItems = [...items, ...items];
  const controls = useAnimationControls();
  const isHovered = useRef(false);

  const startAnimation = async () => {
    await controls.start({
      x: direction === "left" ? [0, "-50%"] : ["-50%", 0],
      transition: {
        ease: "linear",
        duration: 300,
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    startAnimation();
  }, [direction]);

  const handleMouseEnter = () => {
    isHovered.current = true;
    controls.stop();
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    startAnimation();
  };

  return (
    <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
      <motion.div
        className="flex gap-6 pr-6 shrink-0 cursor-pointer"
        animate={controls}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="w-[380px] md:w-[420px] shrink-0 p-6 rounded-2xl 
                       bg-white/[0.02] border border-white/[0.05] backdrop-blur-md
                       flex flex-col justify-between text-left select-none
                       hover:border-white/[0.15] hover:bg-white/[0.04] transition-colors duration-300"
          >
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
              {item.text}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold text-[#E1B816]">
                {item.name[0]}
              </div>
              <div>
                <h4 className="text-zinc-200 text-sm font-semibold">
                  {item.name}
                </h4>
                <p className="text-zinc-500 text-xs">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonial() {
  return (
    <section
      id="testimonials"
      className="bg-[#030303] text-white py-10 px-6 md:px-20 relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-[0.25em] text-[#E1B816] mb-6">
          <div className="w-12 h-[1px] bg-[#E1B816]" aria-hidden="true" />
          <span>[05]</span>
          <span className="text-white/40">Testimonials / What they say</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white max-w-xl leading-tight mb-10">
          Trusted by{" "}
          <span className="text-[#E1B816] font-blackops font-light">
            People,
          </span>{" "}
          Chosen by{" "}
          <span className="text-[#E1B816] font-blackops font-light">
            Brands.
          </span>
        </h2>

        <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto relative z-10">
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </div>
      </div>
    </section>
  );
}
