import { ComponentType } from "react";
import { Globe, Sparkles, Code, Brain } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  tags: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "01",
    title: "Websites",
    description:
      "Modern, high-performance websites built for speed, SEO, and conversions—from business websites to enterprise platforms.",
    icon: Globe,
    tags: [
      "Business Websites",
      "Next.js & React",
      "SEO Optimized",
      "Performance",
    ],
  },
  {
    id: "02",
    title: "Branding",
    description:
      "Build a memorable brand identity with professional logos, visual systems, and consistent design across every customer touchpoint.",
    icon: Sparkles,
    tags: [
      "Logo & Wordmark",
      "Visual Identity",
      "Design System",
      "Brand Guidelines",
    ],
  },
  {
    id: "03",
    title: "Software",
    description:
      "Custom software, web applications, dashboards, and SaaS platforms designed to streamline operations and scale with your business.",
    icon: Code,
    tags: [
      "Custom Software",
      "Web Applications",
      "SaaS Platforms",
      "API Integration",
    ],
  },
  {
    id: "04",
    title: "AI Solutions",
    description:
      "Integrate AI into your business with intelligent automation, custom AI tools, chatbots, and machine learning solutions that improve efficiency and user experience.",
    icon: Brain,
    tags: [
      "AI Automation",
      "Custom AI Tools",
      "Chatbots & Assistants",
      "ML Integration",
    ],
  },
];
