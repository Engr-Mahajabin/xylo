"use client";

import React from "react";
import { projectsData } from "@/data/projectsData";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectsCTA from "@/components/projects/ProjectsCTA";

export default function AllProductsPage() {
  return (
    <main className="relative w-full bg-black text-white overflow-hidden pt-36 pb-24 font-sans min-h-screen">
      {/* ব্যাকগ্রাউন্ড নিওন গ্লো ইফেক্ট */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#E1B816]/5 blur-[150px] pointer-events-none rounded-full" />

      {/* ১. হিরো এবং প্রজেক্ট গ্রিড কন্টেইনার */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        {/* ক্লিন হেডিং সেকশন */}
        <ProjectHero />

        {/* প্রজেক্ট কার্ড গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {projectsData.map((project, index) => {
            const isFullWidthRow = index === 0 || index === 1;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isFullWidthRow={isFullWidthRow}
              />
            );
          })}
        </div>
      </div>

      <ProjectsCTA />
    </main>
  );
}
