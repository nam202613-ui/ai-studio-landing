import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import PrismaticBurst from './components/PrismaticBurst';

function App() {
  return (
    <div className="relative min-h-screen bg-[#120F17]">
      {/* Full-screen PrismaticBurst background */}
      <div className="fixed inset-0 z-0">
        <PrismaticBurst
          intensity={1.5}
          speed={0.3}
          animationType="rotate3d"
          distort={0}
          rayCount={0}
          mixBlendMode="screen"
        />
      </div>

      {/* Gradient overlay to darken bottom */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-transparent via-[#120F17]/40 to-[#120F17] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}

export default App;
