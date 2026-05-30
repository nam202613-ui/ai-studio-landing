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
  const [showUserMenu, setShowUserMenu] = useState(false);

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
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:bg-white/[0.04] px-2 py-1.5 rounded-xl transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  N
                </div>
                <span className="text-white text-sm font-medium hidden sm:block">Nam</span>
                <svg className={`w-4 h-4 text-gray-500 hidden sm:block transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 top-full mt-2 w-72 bg-[#1a1725] border border-white/[0.08] rounded-2xl shadow-2xl z-50 overflow-hidden">
                    {/* User Info */}
                    <div className="p-4 border-b border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                          N
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-semibold text-sm">Nam</span>
                            <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded">FREE</span>
                          </div>
                          <div className="text-gray-500 text-xs truncate">nam202613@gmail.com</div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors">
                        <span>👤</span>
                        Bảng điều khiển
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors">
                        <span>💳</span>
                        Thanh toán
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors">
                        <span>📝</span>
                        Prompt của tôi
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors">
                        <span>🖼️</span>
                        Lịch sử hình ảnh
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors">
                        <span>⚙️</span>
                        Cài đặt
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-white/[0.06]">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
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
