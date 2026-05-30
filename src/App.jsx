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

const SIDEBAR_ITEMS = [
  { id: 'home', label: 'Trang chủ', icon: '🏠' },
  { id: 'chat', label: 'Chat AI', icon: '💬' },
  { id: 'image', label: 'Tạo ảnh', icon: '🎨' },
  { id: 'video', label: 'Tạo video', icon: '🎬' },
  { id: 'remix', label: 'Remix video', icon: '🔄' },
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLanding = currentPage === 'home';

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

      {/* App Layout */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar - only on app pages */}
        {!isLanding && (
          <>
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="fixed top-4 left-4 z-50 lg:hidden bg-white/[0.06] backdrop-blur-xl text-white p-2 rounded-xl border border-white/[0.08]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0d0b12] border-r border-white/[0.06] flex flex-col transition-transform duration-300 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
              {/* Logo */}
              <div className="h-16 flex items-center gap-2.5 px-5 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AI</span>
                </div>
                <span className="text-white font-bold text-base">Studio</span>
              </div>

              {/* Nav Items */}
              <nav className="flex-1 p-3 space-y-1">
                {SIDEBAR_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      currentPage === item.id
                        ? 'bg-indigo-600/20 text-indigo-400'
                        : 'text-gray-500 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Bottom */}
              <div className="p-3 border-t border-white/[0.06]">
                <button
                  onClick={() => setCurrentPage('home')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all"
                >
                  <span className="text-lg">←</span>
                  Về trang chủ
                </button>
              </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
              <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}
          </>
        )}

        {/* Main Content */}
        <main className={`flex-1 ${!isLanding ? 'pt-16 lg:pt-0' : ''}`}>
          {isLanding && <Navbar onNavigate={setCurrentPage} />}

          {currentPage === 'home' && (
            <>
              <Hero onNavigate={setCurrentPage} />
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
        </main>
      </div>
    </div>
  );
}

export default App;
