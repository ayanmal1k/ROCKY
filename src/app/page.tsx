import Hero from "@/components/Hero";
import About from "@/components/About";
import Roadmap from "@/components/Roadmap";
import LoadingScreen from "@/components/LoadingScreen";
import MemeGenerator from "@/components/MemeGenerator";
import Social from "@/components/Social";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <LoadingScreen />
      {/* Hero fixed in place — never moves */}
      <div className="hero-fixed-layer">
        <Hero />
      </div>
      {/* Spacer to push content down past the fixed hero */}
      <div className="h-screen" />
      {/* About scrolls over the pinned hero */}
      <About />
      {/* Horizontal scroll roadmap */}
      <Roadmap />
      {/* Meme Generator */}
      <MemeGenerator />
      {/* Social and Footer sharing the 1.png background */}
      <div
        className="relative w-full bg-black bg-cover bg-center bg-no-repeat overflow-hidden z-20"
        style={{ backgroundImage: "url('/1.png')" }}
      >
        {/* Dark overlay for readability, lightened to make 1.png background highly visible */}
        <div className="absolute inset-0 bg-black/55 z-0 pointer-events-none" />

        <div className="relative z-10">
          {/* Social Connect Section */}
          <Social />
          {/* Small black footer */}
          <Footer />
        </div>
      </div>
    </main>
  );
}
