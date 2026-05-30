import { useState, useRef } from 'react';

const REMIX_STEPS = [
  { id: 'upload', label: 'Tải video', icon: '📤' },
  { id: 'analyze', label: 'Phân tích', icon: '🔍' },
  { id: 'rewrite', label: 'Viết lại kịch bản', icon: '✍️' },
  { id: 'stocks', label: 'Tìm stock', icon: '🎬' },
  { id: 'done', label: 'Hoàn thành', icon: '✅' },
];

const RemixVideo = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleRemix = () => {
    if (!videoUrl.trim()) return;
    setIsProcessing(true);
    setCurrentStep(1);
    setProgress(0);

    let step = 1;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 12;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setCurrentStep(4);
          setResult({
            title: 'Video đã được remix thành công!',
            originalShots: 5,
            newShots: 5,
            duration: '0:32',
          });
          return 100;
        }

        const newStep = Math.min(4, Math.floor(newProgress / 25));
        if (newStep > step) {
          step = newStep;
          setCurrentStep(newStep);
        }
        return newProgress;
      });
    }, 400);
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">Remix Video</h2>
        <p className="text-gray-500 text-sm mb-6">Tải video lên, AI sẽ phân tích và tạo video mới với kịch bản viết lại</p>

        {/* Steps Progress */}
        <div className="flex items-center justify-between mb-8 px-4">
          {REMIX_STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex flex-col items-center gap-1.5 ${
                i <= currentStep ? 'text-white' : 'text-gray-600'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                  i < currentStep ? 'bg-green-500/20 text-green-400' :
                  i === currentStep ? 'bg-indigo-600 text-white' :
                  'bg-white/[0.04] text-gray-600'
                }`}>
                  {i < currentStep ? '✓' : step.icon}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider hidden sm:block">{step.label}</span>
              </div>
              {i < REMIX_STEPS.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-2 mb-5 rounded-full ${
                  i < currentStep ? 'bg-green-500' : 'bg-white/[0.06]'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 mb-6">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Link video hoặc tải file lên</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=... hoặc dán link video"
              className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setVideoUrl(e.target.files[0].name);
                }
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/[0.06] text-gray-400 px-4 py-3 rounded-xl text-sm hover:bg-white/[0.1] transition-colors border border-white/[0.06]"
            >
              Tải file
            </button>
          </div>

          <button
            onClick={handleRemix}
            disabled={!videoUrl.trim() || isProcessing}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-bold transition-colors"
          >
            {isProcessing ? `Đang xử lý... ${Math.round(progress)}%` : '🔄 Bắt đầu Remix'}
          </button>
        </div>

        {/* Progress Bar */}
        {isProcessing && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white font-semibold">{REMIX_STEPS[currentStep]?.label}</span>
              <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {currentStep === 1 && 'Đang phân tích video...'}
              {currentStep === 2 && 'AI đang viết lại kịch bản...'}
              {currentStep === 3 && 'Đang tìm video stock phù hợp...'}
            </p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">{result.title}</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white/[0.04] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">{result.originalShots}</div>
                <div className="text-xs text-gray-500">Cảnh gốc</div>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">{result.newShots}</div>
                <div className="text-xs text-gray-500">Cảnh mới</div>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">{result.duration}</div>
                <div className="text-xs text-gray-500">Thời lượng</div>
              </div>
            </div>
            <div className="bg-white/[0.04] rounded-xl aspect-video flex items-center justify-center mb-4">
              <div className="text-center">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <p className="text-gray-500 text-sm">Video preview</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-white/[0.06] text-white py-3 rounded-xl text-sm font-semibold hover:bg-white/[0.1] transition-colors">
                Xem trước
              </button>
              <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
                Tải xuống
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemixVideo;
