"use client";

import React from "react";
import { motion } from "framer-motion";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function ActionButton({
  children,
  className = "",
  ...props
}: ActionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group overflow-hidden bg-black text-white px-6 py-3 rounded-md text-xs font-semibold tracking-wide border border-white/10 cursor-pointer flex items-center justify-center transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Rotating Glow Line Layer */}
      <span className="absolute inset-0 pointer-events-none rounded-md overflow-hidden">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-[conic-gradient(from_0deg,transparent_45%,#E1B816_85%,transparent_100%)] block"
        />
      </span>

      {/* Inner Mask */}
      <span className="absolute inset-[1px] bg-[#0A0A0A] rounded-[5px] z-0 transition-opacity duration-500 group-hover:opacity-20" />

      {/*  Hover Background Soft Gradient Overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#E1B816]/20 via-[#E1B816]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center space-x-2 text-white/90 group-hover:text-white transition-colors duration-300">
        {children}
      </span>
    </motion.button>
  );
}
