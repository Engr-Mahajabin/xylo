"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ActionButton from "./ActionButton";

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    website: "",
    message: "",
    consent: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdnebyk";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: `${formData.firstName} ${formData.lastName}`,
          Email: formData.email,
          Phone: formData.phone,
          Company: formData.companyName || "N/A",
          Website: formData.website || "N/A",
          Message: formData.message || "No message provided.",
        }),
      });

      if (response.ok) {
        alert("Request sent successfully! 🎉");
        onClose();
      } else {
        alert("Failed to send request. Please try again.");
      }
    } catch (error) {
      console.error("Formspree Error:", error);
      alert("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* ব্যাকড্রপ ওভারলে */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* মডাল বক্স কন্টেন্ট */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-2xl bg-[#090909] border border-white/[0.08] p-8 md:p-12 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 scrollbar-none"
      >
        {/* close button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-6 right-6 text-zinc-400 hover:text-white border border-white/10 rounded px-2.5 py-2.5 bg-transparent transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* মডাল হেডার */}
        <div className="mb-10 text-left">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            Contact
          </span>
          <h3 className="text-4xl md:text-5xl font-normal tracking-tight mt-2 mb-4 text-white">
            Start a{" "}
            <span className="text-[#E1B816] font-blackops font-light italic">
              project.
            </span>
          </h3>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Tell us briefly about your project — we'll reply within 24 hours.
          </p>
        </div>

        {/* ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                First Name <span className="text-[#E1B816]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Anna"
                value={formData.firstName}
                className="w-full bg-[#121212]/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                Last Name <span className="text-[#E1B816]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Smith"
                value={formData.lastName}
                className="w-full bg-[#121212]/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              Email <span className="text-[#E1B816]">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="anna@company.com"
              value={formData.email}
              className="w-full bg-[#121212]/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              Phone Number <span className="text-[#E1B816]">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+1 555 1234567"
              value={formData.phone}
              className="w-full bg-[#121212]/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Company Name{" "}
                <span className="text-zinc-600 lowercase italic">
                  — optional
                </span>
              </label>
              <input
                type="text"
                placeholder="Studio Inc."
                value={formData.companyName}
                className="w-full bg-[#121212]/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Current Website{" "}
                <span className="text-zinc-600 lowercase italic">
                  — optional
                </span>
              </label>
              <input
                type="url"
                placeholder="https://your-domain.com"
                value={formData.website}
                className="w-full bg-[#121212]/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Message{" "}
              <span className="text-zinc-600 lowercase italic">— optional</span>
            </label>
            <textarea
              rows={4}
              placeholder="Idea, industry, timeline — what we should know."
              value={formData.message}
              className="w-full bg-[#121212]/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors resize-none"
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <input
              id="modal-consent"
              type="checkbox"
              required
              checked={formData.consent}
              className="mt-1 accent-[#E1B816] h-4 w-4 rounded border-white/10 bg-[#121212]"
              onChange={(e) =>
                setFormData({ ...formData, consent: e.target.checked })
              }
            />
            <label
              htmlFor="modal-consent"
              className="text-xs text-zinc-400 leading-tight select-none"
            >
              I consent to the processing of my data according to the{" "}
              <a
                href="#"
                className="text-white underline hover:text-[#E1B816] transition-colors"
              >
                privacy policy
              </a>
              .
            </label>
          </div>

          <ActionButton
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-zinc-900 border border-white/10 hover:border-[#E1B816]/40 hover:bg-zinc-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group tracking-wide text-sm cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span>Sending Request...</span>
            ) : (
              <>
                Send request
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </>
            )}
          </ActionButton>
        </form>
      </motion.div>
    </div>
  );
}
