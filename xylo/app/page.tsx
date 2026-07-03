import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import Services from "@/components/home/Service";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <Faq />
    </main>
  );
}
