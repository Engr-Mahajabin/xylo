import Cta from "@/components/home/Cta";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import Projects from "@/components/home/Projects";
import Services from "@/components/home/Service";
import Testimonial from "@/components/home/Testimonial";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Process />
      <Testimonial />
      <Faq />
      <Cta />
    </main>
  );
}
