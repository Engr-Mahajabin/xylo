import { ComponentType } from "react";
import { Globe, Sparkles, Code, Smartphone } from "lucide-react";

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
      "High-performance marketing sites, landing pages and corporate websites — built for conversion and speed.",
    icon: Globe,
    tags: [
      "Next.js & React",
      "Headless CMS",
      "SEO & Performance",
      "A/B Testing",
    ],
  },
  {
    id: "02",
    title: "Branding",
    description:
      "Brand identities from logo to design system — identities that stick and stay consistent across every touchpoint.",
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
      "Custom tools, internal platforms and SaaS products. From MVP to scalable enterprise solution.",
    icon: Code,
    tags: [
      "Web Apps & Dashboards",
      "API & Backend",
      "SaaS Platforms",
      "Internal Tools",
    ],
  },
  {
    id: "04",
    title: "Mobile Apps",
    description:
      "Native and cross-platform apps with first-class user experience — iOS, Android and everything in between.",
    icon: Smartphone,
    tags: [
      "iOS & Android",
      "React Native",
      "App Store Launch",
      "Push & Analytics",
    ],
  },
];
