export interface ProcessStep {
  id: string;
  total: string;
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
}

export const processData: ProcessStep[] = [
  {
    id: "01",
    total: "04",
    title: "Strategy",
    description:
      "We get to know you and your brand. Goals, audience, competition. Out of that comes the roadmap everything else stands on.",
    imageSrc: "/images/process/strategy.png", // আপনার ইমেজের পাথ দিন
    tags: [
      "Briefing & Workshop",
      "Competitor Analysis",
      "Brand Strategy",
      "Roadmap",
    ],
  },
  {
    id: "02",
    total: "04",
    title: "Design",
    description:
      "Identity, interface, prototype. This is where the brand becomes visible — from logo to the last pixel of the site.",
    imageSrc: "/images/process/design.png",
    tags: ["Brand Identity", "Wireframes & UX", "UI Design", "Design System"],
  },
  {
    id: "03",
    total: "04",
    title: "Build",
    description:
      "Engineering on a modern stack: Next.js, React, performance-first. Clean code that scales and still runs in five years.",
    imageSrc: "/images/process/build.png",
    tags: [
      "Frontend & CMS",
      "Backend / API",
      "Performance & SEO",
      "QA & Testing",
    ],
  },
  {
    id: "04",
    total: "04",
    title: "Launch & Care",
    description:
      "Deployment, monitoring, continuous optimization. We stay on it — your brand grows, and we grow with it.",
    imageSrc: "/images/process/rocket.png",
    tags: [
      "Go-Live",
      "Analytics",
      "Maintenance & Updates",
      "Iteration & Growth",
    ],
  },
];
