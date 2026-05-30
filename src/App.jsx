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
  { id: 'chat', label: 'Chat AI', icon: '💬' },
  { id: 'image', label: 'Tạo ảnh', icon: '🎨' },
  { id: 'video', label: 'Tạo video', icon: '🎬' },
  { id: 'remix', label: 'Remix video', icon: '🔄' },
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = currentPage === 'home';

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
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

      {/* App Layout */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        {!isLanding && (
          <>
            {/* Mobile header */}
            <div className="fixed top-0 left-0 right-0 h-14 bg-[#0d0b12]/95 backdrop-blur-xl border-b border-white/[0.06] flex items-center px-4 z-40 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-400 hover:text-white p-1.5"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              {/* Mobile Logo */}
              <button onClick={() => navigateTo('home')} className="flex items-center gap-2 ml-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-[10px]">AI</span>
                </div>
                <span className="text-white font-bold text-sm">Studio</span>
              </button>
            </div>

            {/* Mobile overlay */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-40 h-full bg-[#0d0b12] border-r border-white/[0.06] flex flex-col transition-all duration-300 ${
              sidebarCollapsed ? 'w-[68px]' : 'w-60'
            } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
              {/* Logo */}
              <div className="h-14 flex items-center border-b border-white/[0.06] shrink-0 px-4">
                <button onClick={() => navigateTo('home')} className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xs">AI</span>
                  </div>
                  {!sidebarCollapsed && <span className="text-white font-bold text-base whitespace-nowrap">Studio</span>}
                </button>
              </div>

              {/* Nav Items */}
              <nav className="flex-1 p-2 space-y-1 mt-1">
                {SIDEBAR_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 rounded-xl text-sm font-medium transition-all ${
                      sidebarCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'
                    } ${
                      currentPage === item.id
                        ? 'bg-indigo-600/20 text-indigo-400'
                        : 'text-gray-500 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    {!sidebarCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                  </button>
                ))}
              </nav>

              {/* Collapse Toggle */}
              <div className="p-2 border-t border-white/[0.06]">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all ${
                    sidebarCollapsed ? 'justify-center px-0' : ''
                  }`}
                  title={sidebarCollapsed ? 'Mở rộng' : 'Thu gọn'}
                >
                  <svg className={`w-5 h-5 shrink-0 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                  </svg>
                  {!sidebarCollapsed && <span>Thu gọn</span>}
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className={`flex-1 min-h-screen ${!isLanding ? (sidebarCollapsed ? 'lg:ml-[68px]' : 'lg:ml-60') : ''} ${!isLanding ? 'pt-14 lg:pt-0' : ''}`}>
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
        </main>
      </div>
    </div>
  );
}

export default App;
