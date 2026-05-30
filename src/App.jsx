import { useState } from 'react';
import PrismaticBurst from './components/PrismaticBurst';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import ImageGenerator from './components/ImageGenerator';
import VideoGenerator from './components/VideoGenerator';
import RemixVideo from './components/RemixVideo';

const NAV_ITEMS = [
  { id: 'chat', label: 'Chat AI', icon: '💬' },
  { id: 'image', label: 'Tạo ảnh', icon: '🎨' },
  { id: 'video', label: 'Tạo video', icon: '🎬' },
  { id: 'remix', label: 'Remix video', icon: '🔄' },
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const isLanding = currentPage === 'home';

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative min-h-screen bg-[#120F17]">
      {/* PrismaticBurst background - only on landing */}
      {isLanding && (
        <>
          <div className="fixed inset-0 z-0">
            <PrismaticBurst intensity={1.5} speed={0.3} animationType="rotate3d" distort={0} rayCount={0} mixBlendMode="screen" />
          </div>
          <div className="fixed inset-0 z-[1] bg-gradient-to-b from-transparent via-[#120F17]/40 to-[#120F17] pointer-events-none" />
        </>
      )}

      {/* Top Nav - App Pages */}
      {!isLanding && (
        <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0d0b12]/95 backdrop-blur-xl border-b border-white/[0.06] flex items-center px-4 gap-4">
          {/* Logo */}
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">AI</span>
            </div>
            <span className="text-white font-bold text-sm hidden sm:block">Studio</span>
          </button>

          <div className="h-6 w-px bg-white/[0.08] shrink-0" />

          {/* Nav Items */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  currentPage === item.id
                    ? 'bg-white/[0.08] text-white'
                    : 'text-gray-500 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="ml-auto flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-sm">
              <span className="text-yellow-500">⚡</span>
              <span className="text-white font-semibold">0/30</span>
              <span className="text-[11px] text-gray-500">credits</span>
            </div>
            <button
              onClick={() => navigateTo('home')}
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </button>
          </div>
        </nav>
      )}

      {/* Content */}
      <div className={`${!isLanding ? 'pt-14' : ''}`}>
        {isLanding && <Navbar onNavigate={navigateTo} />}

        {currentPage === 'home' && (
          <>
            <Hero onNavigate={navigateTo} />
            <Stats />
            <Features />
            <Pricing />
            <Footer />
          </>
        )}
        {currentPage === 'chat' && <ChatBot />}
        {currentPage === 'image' && <ImageGenerator />}
        {currentPage === 'video' && <VideoGenerator />}
        {currentPage === 'remix' && <RemixVideo />}
      </div>
    </div>
  );
}

export default App;
