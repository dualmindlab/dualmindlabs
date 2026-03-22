import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import BackgroundEffects from "@/components/BackgroundEffects";

export default function Home() {
  return (
    <>
      <CursorFollower />
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Services />
        <Testimonials />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
