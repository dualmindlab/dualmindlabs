import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Integrations from "@/components/Integrations";
import DevExperience from "@/components/DevExperience";
import FeaturesGrid from "@/components/FeaturesGrid";
import CodeSection from "@/components/CodeSection";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Integrations />
        <DevExperience />
        <FeaturesGrid />
        <CodeSection />
        <Testimonials />
        <Pricing />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
