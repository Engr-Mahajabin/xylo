"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // 🚀 নেক্সট ইমেজ ইম্পোর্ট করা হয়েছে লোগোর জন্য
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import ActionButton from "@/components/ui/ActionButton";

const socialLinks = [
  {
    name: "Twitter / X",
    icon: <FaXTwitter />,
    href: "https://x.com/your_brand",
  },
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    href: "https://facebook.com/your_brand",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    href: "https://instagram.com/your_brand",
  },
  {
    name: "Linkedin",
    icon: <FaLinkedinIn />,
    href: "https://linkedin.com/company/your_brand",
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#030303] text-white pt-32 pb-12 overflow-hidden select-none">
      {/* ১. ব্যাকগ্রাউন্ডের জায়ান্ট টেক্সট (XYLO) - পুরো বডি কাভার করার জন্য আপগ্রেড করা হয়েছে */}
      {/* <div className="absolute inset-x-0 top-6 md:top-0 w-full flex justify-center pointer-events-none z-0">
        <h1 className="text-[24vw] font-black tracking-tighter text-[#141414] opacity-80 uppercase select-none leading-none w-full text-center">
          XYLO
        </h1>
      </div> */}

      {/* ২. মেইন কন্টেন্ট কন্টেইনার - z-10 দিয়ে টেক্সটের ওপরে রাখা হয়েছে */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        {/* 🚀 ব্র্যান্ড লোগো - এখন ৪টা কার্ডের মতোই ActionButton এবং গ্লাসমরফিজম স্টাইল */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 mb-6"
        >
          <ActionButton
            className="w-full h-full flex items-center justify-center rounded-2xl 
                       bg-white/[0.02] border border-white/[0.05] backdrop-blur-md
                       hover:bg-white/[0.07] hover:border-white/[0.15] 
                       transition-all duration-300 ease-out cursor-pointer p-0 group shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative w-7 h-7 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/xylo logo.svg" // 👈 আপনার বানানো লোগো ইমেজ পাথ
                alt="Brand Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </ActionButton>
        </motion.div>

        {/* টেক্সট হেডিং */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl font-semibold tracking-tight max-w-md mt-2"
        >
          Get connected
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 text-sm mt-2 mb-16 md:mb-24"
        >
          Don't miss our new updates!
        </motion.p>

        {/* ৩. সোশ্যাল বাটন কার্ডস */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mb-24 z-10">
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-full"
            >
              <ActionButton
                className="w-full flex items-center justify-between px-6 py-4 rounded-xl 
                           bg-white/[0.02] border border-white/[0.05] backdrop-blur-md
                           hover:bg-white/[0.07] hover:border-white/[0.15] 
                           transition-all duration-300 ease-out cursor-pointer p-0 group"
                onClick={() =>
                  window.open(link.href, "_blank", "noopener,noreferrer")
                }
              >
                {/* সোশ্যাল মিডিয়া নেম */}
                <span className="text-gray-300 font-medium group-hover:text-white transition-colors text-[13px] tracking-wide">
                  {link.name}
                </span>

                {/* ডান পাশের ছোট গোল আইকন বক্স */}
                <div className="w-8 h-8 rounded-full bg-[#E1B816] flex items-center justify-center text-white transition-all duration-300 text-sm">
                  {link.icon}
                </div>
              </ActionButton>
            </motion.div>
          ))}
        </div>

        {/* ৪. নিচের কপিরাইট ও ব্যাক টু টপ সেকশন */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-xs text-white pt-6 z-20">
          <p>{new Date().getFullYear()} XYLO. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 sm:mt-0 flex items-center gap-1"
          >
            Back to top
            <span className="group-hover:-translate-y-0.5 transition-transform">
              ↑
            </span>
          </button>
        </div>
      </div>

      {/* ৫. বটম গোল্ডেন (#E1B816) রিф্লেকশন ও গ্লো ইফেক্ট */}
      <div className="absolute bottom-0 inset-x-0 h-100 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#E1B816] to-transparent opacity-90" />
        <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[90%] h-56 bg-[#E1B816] opacity-[0.25] blur-[100px] rounded-full" />
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-[#E1B816]/[0.1] via-[#E1B816]/[0.03] to-transparent" />
      </div>
    </footer>
  );
}
