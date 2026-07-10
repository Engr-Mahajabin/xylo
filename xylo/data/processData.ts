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
      "We start by understanding your business, goals, users, and market. From there, we define a clear strategy and roadmap for a successful digital product.",
    imageSrc: "/images/process/strategy.png",
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
      "We transform ideas into intuitive user experiences through branding, wireframes, prototypes, and modern UI design that reflects your business.",
    imageSrc: "/images/process/design.png",
    tags: ["Brand Identity", "Wireframes & UX", "UI Design", "Design System"],
  },
  {
    id: "03",
    total: "04",
    title: "Build",
    description:
      "We develop fast, secure, and scalable websites, custom software, SaaS platforms, and AI-powered solutions using modern technologies and best practices.",
    imageSrc: "/images/process/build.png",
    tags: [
      "Custom Development",
      "Web & SaaS",
      "AI Integration",
      "Testing & Deployment",
    ],
  },
  {
    id: "04",
    total: "04",
    title: "Launch & Care",
    description:
      "After launch, we continue to support your product with monitoring, maintenance, updates, and ongoing improvements to help your business grow.",
    imageSrc: "/images/process/launch.png",
    tags: [
      "Go-Live",
      "Analytics",
      "Maintenance & Updates",
      "Iteration & Growth",
    ],
  },
];
