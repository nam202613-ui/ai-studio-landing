import { useState } from 'react';

const MOCK_IMAGES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1686191128892-3b370284f75b?w=400&h=400&fit=crop', prompt: 'Cyberpunk city at night', style: 'cyberpunk', date: '30/05/2026' },
  { id: 2, url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop', prompt: 'Anime girl with blue hair', style: 'anime', date: '29/05/2026' },
  { id: 3, url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop', prompt: 'Space astronaut', style: 'cinematic', date: '28/05/2026' },
  { id: 4, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', prompt: 'Mountain landscape', style: 'realistic', date: '27/05/2026' },
  { id: 5, url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=400&fit=crop', prompt: 'Neon lights abstract', style: 'cyberpunk', date: '26/05/2026' },
  { id: 6, url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop', prompt: 'Earth from space', style: 'realistic', date: '25/05/2026' },
];

const ImageHistory = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [view, setView] = useState('grid');

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Lịch sử hình ảnh</h1>
          <p className="text-gray-500 text-sm">{MOCK_IMAGES.length} hình ảnh đã tạo</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-white/[0.08] text-white' : 'text-gray-500 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-white/[0.08] text-white' : 'text-gray-500 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_IMAGES.map(img => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:border-white/[0.12] transition-all"
            >
              <img src={img.url} alt={img.prompt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white text-xs font-medium truncate">{img.prompt}</div>
                  <div className="text-gray-400 text-[10px] mt-1">{img.date}</div>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <button className="p-1.5 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {MOCK_IMAGES.map(img => (
            <div key={img.id} className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 hover:border-white/[0.1] transition-colors">
              <img src={img.url} alt={img.prompt} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{img.prompt}</div>
                <div className="text-gray-500 text-xs mt-1">
                  <span className="bg-white/[0.06] px-2 py-0.5 rounded-full">{img.style}</span>
                  <span className="ml-2">{img.date}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6" onClick={() => setSelectedImage(null)}>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.prompt} className="w-full rounded-2xl" />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-white font-medium">{selectedImage.prompt}</div>
                <div className="text-gray-500 text-sm">{selectedImage.style} • {selectedImage.date}</div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-400 hover:text-white p-2"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageHistory;
