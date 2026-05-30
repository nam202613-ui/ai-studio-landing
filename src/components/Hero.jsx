const Hero = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="relative z-10 max-w-4xl mx-auto">
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] rounded-full px-4 py-1.5 mb-8 text-sm text-gray-400 hover:bg-white/[0.12] transition-colors"
        >
          <span className="text-white">Mới</span>
          <span>Tạo ảnh & video AI phiên bản 2.0 đã ra mắt</span>
          <span className="text-gray-500">→</span>
        </a>

        <h1 className="text-6xl md:text-8xl lg:text-[110px] font-extrabold text-white leading-[0.95] tracking-tight mb-8">
          Công cụ AI<br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Tạo ảnh & Video
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Các công cụ AI mạnh mẽ, giúp dự án sáng tạo của bạn thực sự nổi bật.
          Tạo ảnh và video tuyệt đẹp chỉ trong vài giây.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate?.('chat')}
            className="w-full sm:w-auto bg-white text-black px-8 py-3.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
          >
            Bắt đầu miễn phí
          </button>
          <a
            href="#features"
            className="w-full sm:w-auto bg-white/[0.08] text-white px-8 py-3.5 rounded-full font-bold text-sm border border-white/[0.08] hover:bg-white/[0.15] transition-all"
          >
            Tìm hiểu thêm
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
