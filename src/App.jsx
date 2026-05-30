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
          <div className="ml-auto flex items-center gap-4 shrink-0">
            {/* Credits */}
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-yellow-500">⚡</span>
              <span className="text-gray-400">Credit:</span>
              <span className="text-white font-semibold">30</span>
            </div>

            <div className="h-6 w-px bg-white/[0.08]" />

            {/* User */}
            <button className="flex items-center gap-2 hover:bg-white/[0.04] px-2 py-1.5 rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                N
              </div>
              <span className="text-white text-sm font-medium hidden sm:block">Nam</span>
              <svg className="w-4 h-4 text-gray-500 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
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
