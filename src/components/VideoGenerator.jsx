import { useState } from 'react';

const VideoGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [duration, setDuration] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(false);

  const styles = [
    { id: 'cinematic', name: 'Điện ảnh', icon: '🎬' },
    { id: 'animation', name: 'Hoạt hình', icon: '🎥' },
    { id: 'timelapse', name: 'Timelapse', icon: '⏱️' },
    { id: 'slowmo', name: 'Chậm', icon: '🐌' },
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setProgress(0);
    setGenerated(false);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setGenerated(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">Tạo video AI</h2>
        <p className="text-gray-500 text-sm mb-6">Từ mô tả văn bản hoặc ảnh, AI sẽ tạo video chuyên nghiệp</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Controls */}
          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Mô tả video</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ví dụ: Một thành phố tương lai với tàu bay và ánh neon..."
                className="w-full bg-transparent text-white placeholder:text-gray-600 text-sm resize-none focus:outline-none min-h-[100px]"
                rows={4}
              />
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Phong cách</label>
              <div className="grid grid-cols-2 gap-2">
                {styles.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl text-sm transition-all ${
                      selectedStyle === s.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span>{s.icon}</span>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">
                Thời lượng: <span className="text-white">{duration}s</span>
              </label>
              <input
                type="range"
                min={3}
                max={30}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                <span>3s</span>
                <span>30s</span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed text-white py-3.5 rounded-xl text-sm font-bold transition-colors"
            >
              {isGenerating ? `Đang tạo... ${Math.round(progress)}%` : '🎬 Tạo video'}
            </button>
          </div>

          {/* Right: Preview */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden">
            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-gray-500 text-xs">AI đang xử lý video của bạn...</p>
              </div>
            )}

            {generated && !isGenerating && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-600/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-white font-semibold text-sm mb-1">Video đã sẵn sàng!</p>
                <p className="text-gray-500 text-xs mb-4">Thời lượng {duration}s • Phong cách {styles.find(s => s.id === selectedStyle)?.name}</p>
                <div className="flex gap-2 justify-center">
                  <button className="bg-white/10 text-white text-xs px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                    Xem trước
                  </button>
                  <button className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Tải xuống
                  </button>
                </div>
              </div>
            )}

            {!isGenerating && !generated && (
              <div className="text-center px-8">
                <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">Nhập mô tả và nhấn tạo để bắt đầu</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
