export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
}

export interface MarqueeRowProps {
  items: TestimonialItem[];
  direction?: "left" | "right";
}

export const row1: TestimonialItem[] = [
  {
    name: "Jenna Carvalho",
    role: "Principal @ Guardian Estate",
    text: "Working with Xylo was a pleasure. They were proactive, efficient, and never hesitated to challenge my assumptions. The system they built for us is beautiful.",
  },
  {
    name: "Ted Nash",
    role: "Founder & CEO @ Yenex",
    text: "I've had the pleasure of collaborating with them for a while now. They're lightning-quick in addressing feedback and always go the extra mile.",
  },
  {
    name: "Sofia Gouveia",
    role: "Design Director @ Exdiac",
    text: "Excellent experience. They were patient, attentive to feedback, and delivered clean, consistent, high-quality work. Highly recommended!",
  },
  // 🚀 নতুন ৩টি ডাটা (Row 1)
  {
    name: "Marcus Aurelius",
    role: "Lead Architect @ Nova Core",
    text: "The frontend optimization they achieved is mind-blowing. Our core web vitals jumped straight to 99%, and the code structure is exceptionally clean.",
  },
  {
    name: "Sarah Jenkins",
    role: "Product Owner @ VibeStudio",
    text: "Their attention to micro-interactions and smooth Framer Motion integration brought our web app to life. Exceptional eye for modern aesthetics.",
  },
  {
    name: "David Chen",
    role: "CTO @ NexusPay",
    text: "Rare to find developers who understand both beautiful UX and complex state management deeply. They delivered the perfect production-ready MERN stack application.",
  },
];

export const row2: TestimonialItem[] = [
  {
    name: "Laiza Lamyea Lia",
    role: "Marketing Lead @ Akij Group",
    text: "The experience has been truly remarkable. Their cooperative nature, combined with their innovative ideas and unwavering effort, made our partnership a fruitful one.",
  },
  {
    name: "Neil Saidi",
    role: "Founder @ LeKlub",
    text: "Had an amazing experience with the team. They understood my vision and turned it into stunning visuals, with impressive attention to detail.",
  },
  {
    name: "Shakhawat Hossain",
    role: "Founder @ Camesta",
    text: "What I love most is how they truly listen to their clients. They guided us through each step, kept us informed, and made sure the final design was exactly what we envisioned.",
  },
  // 🚀 নতুন ৩টি ডাটা (Row 2)
  {
    name: "Elena Rostova",
    role: "Creative Director @ Bloom Interactive",
    text: "They treated our project as their own. The communication was seamless, updates were frequent, and the final Next.js platform exceeded our expectations.",
  },
  {
    name: "Imran Ahmed",
    role: "Operations Head @ ApexDigital",
    text: "Zero friction, transparent timelines, and pixel-perfect design execution. They are definitely our go-to partner for all future high-fidelity frontend builds.",
  },
  {
    name: "Olivia Vance",
    role: "Founder @ Aura-Wear",
    text: "Their blend of premium structural engineering and sleek design aesthetics gave our digital platform exactly the elite look we were aiming for.",
  },
];
