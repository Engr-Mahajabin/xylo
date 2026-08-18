import React from "react";
import { TestimonialItem } from "./testimonial.types";

interface TestimonialCardProps {
  item: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ item }) => {
  return (
    <div
      className="w-[380px] md:w-[420px] shrink-0 p-6 rounded-2xl 
                 bg-white/[0.02] border border-white/[0.05] backdrop-blur-md
                 flex flex-col justify-between text-left select-none
                 hover:border-white/[0.15] hover:bg-white/[0.04] transition-colors duration-300"
    >
      {/* Review Content */}
      <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
        {item.text}
      </p>

      {/* Author Footer */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold text-[#E1B816] shrink-0">
          {item.name ? item.name[0].toUpperCase() : "U"}
        </div>

        <div className="truncate">
          <h4 className="text-zinc-200 text-sm font-semibold truncate">
            {item.name}
          </h4>
          <p className="text-zinc-500 text-xs truncate">{item.role}</p>
        </div>
      </div>
    </div>
  );
};
