"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import ActionButton from "@/components/ui/ActionButton";
import ContactModal from "../ui/ContactModal";

const MobileMenu = dynamic(() => import("../home/MobileMenu"), { ssr: false });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Works", href: "#works" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="absolute top-6 left-0 w-full z-50 bg-transparent px-4 sm:px-6">
      <div className="max-w-3xl mx-auto border border-white/10 bg-black/20 backdrop-blur-xl rounded-xl h-20 px-6 flex items-center justify-between shadow-2xl relative">
        <div className="flex items-center cursor-pointer group">
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/xylo logo.svg"
              alt="Brand Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Middle Side */}
        <nav className="hidden md:flex items-center space-x-8 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-2 transition-colors duration-300 hover:text-[#E1B816] group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E1B816] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <ActionButton
            onClick={() => setIsModalOpen(true)}
            className="rounded-md px-5 py-2.5 text-[11px] uppercase tracking-widest font-bold border border-white/5 bg-zinc-950/80 cursor-pointer"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ActionButton>

          {/* Mobile Layout Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white cursor-pointer z-50 border border-white/10 rounded-md bg-zinc-900/50"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Container */}
      <AnimatePresence>
        {isOpen && <MobileMenu navLinks={navLinks} setIsOpen={setIsOpen} />}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
