"use client";

import { motion } from "framer-motion";

interface MobileMenuProps {
  navLinks: { name: string; href: string }[];
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ navLinks, setIsOpen }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute top-24 left-0 w-full bg-black/95 border-b border-white/5 md:hidden flex flex-col p-8 space-y-6 z-40 backdrop-blur-lg"
    >
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          onClick={() => setIsOpen(false)}
          className="text-xl font-medium text-gray-400 hover:text-[#E1B816] pb-2 border-b border-white/5 transition-colors duration-300"
        >
          {link.name}
        </a>
      ))}
    </motion.div>
  );
}
