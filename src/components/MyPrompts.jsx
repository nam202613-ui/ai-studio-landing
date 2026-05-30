import { useState } from 'react';

const MOCK_PROMPTS = [
  {
    id: 1,
    title: 'Cyberpunk City',
    prompt: 'A futuristic cyberpunk city at night with neon lights, rain, flying cars, and tall skyscrapers',
    style: 'cyberpunk',
    used: 12,
    created: '30/05/2026',
  },
  {
    id: 2,
    title: 'Anime Portrait',
    prompt: 'Beautiful anime girl with long blue hair, cherry blossoms, soft lighting, detailed face',
    style: 'anime',
    used: 8,
    created: '29/05/2026',
  },
  {
    id: 3,
    title: 'Nature Landscape',
    prompt: 'Majestic mountain landscape with lake reflection, sunset, clouds, photorealistic',
    style: 'realistic',
    used: 5,
    created: '28/05/2026',
  },
  {
    id: 4,
    title: 'Space Scene',
    prompt: 'Astronaut floating in space with Earth in background, stars, nebula, cinematic lighting',
    style: 'cinematic',
    used: 3,
    created: '27/05/2026',
  },
];

const MyPrompts = () => {
  const [prompts, setPrompts] = useState(MOCK_PROMPTS);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Prompt của tôi</h1>
          <p className="text-gray-500 text-sm">Quản lý các prompt đã lưu</p>
        </div>
        <div className="text-gray-500 text-sm">{prompts.length} prompt</div>
      </div>

      {prompts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📝</div>
          <div className="text-gray-400 text-lg mb-2">Chưa có prompt nào</div>
          <div className="text-gray-600 text-sm">Prompt sẽ được lưu tự động khi bạn tạo ảnh</div>
        </div>
      ) : (
        <div className="space-y-4">
          {prompts.map(p => (
            <div key={p.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.1] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-semibold text-sm">{p.title}</h3>
                    <span className="bg-white/[0.06] text-gray-400 text-[10px] font-medium px-2 py-0.5 rounded-full uppercase">{p.style}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{p.prompt}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                    <span>🔄 Dùng {p.used} lần</span>
                    <span>📅 {p.created}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(p.id, p.prompt)}
                    className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                    title="Copy"
                  >
                    {copiedId === p.id ? (
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Xóa"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPrompts;
