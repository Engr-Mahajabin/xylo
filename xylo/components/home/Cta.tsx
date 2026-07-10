"use client";

import React, { useState } from "react";
import ActionButton from "../ui/ActionButton";

export default function Cta() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // আপনার সাবমিট লজিক বা API কল এখানে দিন
  };

  return (
    <section
      id="contact"
      className="bg-black text-white py-10 px-6 font-sans relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Side */}
        <div className="lg:col-span-5 flex flex-col justify-start gap-16 lg:gap-24">
          <div>
            {/* Header Tagline */}
            <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-[0.25em] text-[#E1B816] mb-8">
              <div className="w-12 h-[1px] bg-[#E1B816]" aria-hidden="true" />
              <span>[07]</span>
              <span className="text-white/40">Contact</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl font-normal tracking-tight mb-8 leading-none">
              Let's{" "}
              <span className="text-[#E1B816] font-blackops font-light">
                Talk.
              </span>
            </h2>

            {/* Description */}
            <p className="text-zinc-400 text-sm md:text-base max-w-md leading-relaxed font-light">
              Tell us about your next project for Ambitious Digital Products,
              and we'll reply within 24 hours with concrete next steps.
            </p>
          </div>

          {/* Contact Information */}
          <div className="border-t border-white/10 text-sm w-full">
            <div className="flex py-5 border-b border-white/10 items-center">
              <span className="w-24 text-zinc-500 text-xs uppercase tracking-wider">
                Email
              </span>
              <a
                href="mailto:info@xylo.agency"
                className="text-zinc-200 hover:text-[#E1B816] transition-colors font-medium"
              >
                info@xylo.agency
              </a>
            </div>
            <div className="flex py-5 border-b border-white/10 items-center">
              <span className="w-24 text-zinc-500 text-xs uppercase tracking-wider">
                Phone
              </span>
              <a
                href="tel:+4915754405511"
                className="text-zinc-200 hover:text-[#E1B816] transition-colors font-medium"
              >
                +49 1575 4405511
              </a>
            </div>

            {/* Foot Note */}
            <div className="mt-8 text-xs text-zinc-500 uppercase tracking-[0.15em] flex items-center gap-2">
              <span>Reply within 24h</span>
              <span className="text-white/20">•</span>
              <span>24/7 Available</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-7 bg-[#090909] border border-white/[0.05] p-8 md:p-12 rounded-2xl backdrop-blur-md">
          <div className="mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E1B816]">
              Briefing
            </span>
            <h3 className="text-2xl md:text-3xl font-normal mt-1">
              Send us a{" "}
              <span className="text-[#E1B816] font-blackops font-light">
                Short Briefing.
              </span>
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                  First Name <span className="text-[#E1B816]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Anna"
                  className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-3 text-sm text-zinc-400 placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
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
                  className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                Email <span className="text-[#E1B816]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="anna@company.com"
                className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                Phone Number <span className="text-[#E1B816]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+1 555 1234567"
                className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            {/* Company Name & Current Website */}
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
                  className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
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
                  className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors"
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Message{" "}
                <span className="text-zinc-600 lowercase italic">
                  — optional
                </span>
              </label>
              <textarea
                rows={4}
                placeholder="Idea, industry, timeline — what we should know."
                className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E1B816]/50 transition-colors resize-none"
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            {/* Privacy Policy Consent */}
            <div className="flex items-start space-x-3 pt-2">
              <input
                id="consent"
                type="checkbox"
                required
                className="mt-1 accent-[#E1B816] h-4 w-4 rounded border-white/10 bg-[#121212]"
                onChange={(e) =>
                  setFormData({ ...formData, consent: e.target.checked })
                }
              />
              <label
                htmlFor="consent"
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

            {/* Submit Button */}
            <ActionButton
              type="submit"
              className="w-full mt-4 bg-zinc-900 border border-white/10 hover:border-[#E1B816]/40 hover:bg-zinc-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group tracking-wide text-sm"
            >
              Send request
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </ActionButton>
          </form>
        </div>
      </div>
    </section>
  );
}
