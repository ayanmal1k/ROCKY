import Hero from "@/components/Hero";
import About from "@/components/About";
import Roadmap from "@/components/Roadmap";
import LoadingScreen from "@/components/LoadingScreen";

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
    </main>
  );
}
