import { useState } from 'react';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1686191128892-3b370284f75b?w=512&h=512&fit=crop',
  'https://images.unsplash.com/photo-1686191128892-3b370284f75b?w=512&h=512&fit=crop&q=80',
  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=512&h=512&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=512&h=512&fit=crop',
];

const STYLES = [
  { id: 'realistic', name: 'Chân thực', icon: '📷' },
  { id: 'anime', name: 'Anime', icon: '🎨' },
  { id: 'oil', name: 'Tranh sơn dầu', icon: '🖼️' },
  { id: 'pixel', name: 'Pixel Art', icon: '👾' },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: '🌃' },
  { id: 'watercolor', name: 'Màu nước', icon: '💧' },
];

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const newImages = Array.from({ length: 4 }, (_, i) => ({
        id: Date.now() + i,
        url: SAMPLE_IMAGES[i % SAMPLE_IMAGES.length],
        prompt: prompt,
        style: selectedStyle,
      }));
      setGeneratedImages(newImages);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">Tạo ảnh AI</h2>
        <p className="text-gray-500 text-sm mb-6">Mô tả bức ảnh bạn muốn, AI sẽ tạo ra cho bạn</p>

        {/* Prompt Input */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ví dụ: Một chú mèo đang ngồi trên mặt trăng, phong cách cyberpunk, ánh sáng neon..."
            className="w-full bg-transparent text-white placeholder:text-gray-600 text-sm resize-none focus:outline-none min-h-[80px]"
            rows={3}
          />

          {/* Style Selector */}
          <div className="flex flex-wrap gap-2 mt-4 mb-4">
            {STYLES.map(style => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedStyle === style.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/[0.06] text-gray-400 hover:bg-white/[0.1]'
                }`}
              >
                <span>{style.icon}</span>
                {style.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-bold transition-colors"
          >
            {isGenerating ? 'Đang tạo...' : '✨ Tạo ảnh'}
          </button>
        </div>

        {/* Generated Images */}
        {generatedImages.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Kết quả</h3>
            <div className="grid grid-cols-2 gap-4">
              {generatedImages.map(img => (
                <div key={img.id} className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] aspect-square">
                  <img src={img.url} alt={img.prompt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-2 w-full">
                      <button className="flex-1 bg-white/20 backdrop-blur-sm text-white text-xs py-2 rounded-lg hover:bg-white/30 transition-colors">
                        Tải xuống
                      </button>
                      <button className="flex-1 bg-indigo-600 text-white text-xs py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        Sử dụng
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
