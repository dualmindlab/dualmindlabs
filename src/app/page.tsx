import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorBlob from "@/components/CursorBlob";
import MotionConfigProvider from "@/components/MotionConfigProvider";

export default function Home() {
  return (
    <MotionConfigProvider>
      <CursorBlob />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Services />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
