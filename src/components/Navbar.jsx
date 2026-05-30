import { useState, useEffect } from 'react';

const OvideoLogo = () => (
  <svg viewBox="0 0 120 40" className="h-8" fill="none">
    {/* Hexagon + V mark */}
    <g transform="translate(0, 2)">
      {/* Hexagon */}
      <path d="M16 2L28.5 9.5V24.5L16 32L3.5 24.5V9.5L16 2Z" fill="#4F8AFF" />
      <path d="M16 2L28.5 9.5V24.5L16 32L3.5 24.5V9.5L16 2Z" fill="url(#hexGrad)" />
      {/* V shape inside */}
      <path d="M10 10L16 24L22 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Signal waves */}
      <path d="M2 16C2 16 4 12 8 12" stroke="#4F8AFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M26 16C26 16 28 12 32 12" stroke="#4F8AFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M0 20C0 20 3 24 8 24" stroke="#4F8AFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M28 20C28 20 31 24 36 24" stroke="#4F8AFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </g>
    {/* Text */}
    <text x="38" y="25" fill="white" fontSize="18" fontWeight="800" fontFamily="Inter, sans-serif">
      <tspan fill="#4F8AFF">O</tspan>video
    </text>
    <defs>
      <linearGradient id="hexGrad" x1="3.5" y1="2" x2="28.5" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6BA3FF" />
        <stop offset="1" stopColor="#3366CC" />
      </linearGradient>
    </defs>
  </svg>
);

const Navbar = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#120F17]/80 backdrop-blur-xl border-b border-white/[0.04]' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center shrink-0">
            <OvideoLogo />
          </button>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
              Tính năng
            </a>
            <a href="#pricing" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
              Bảng giá
            </a>
          </div>
        </div>

        {/* Right: GitHub + Demo */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/nam202613-ui/ai-studio-landing"
            target="_blank"
            rel="noopener"
            className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <button
            onClick={() => onNavigate?.('chat')}
            className="bg-[#4F8AFF] hover:bg-[#3d75e6] text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            Demo
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
