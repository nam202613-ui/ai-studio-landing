import { useState, useRef, useEffect } from 'react';

const AI_MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', icon: '🟢', color: 'from-green-500 to-emerald-600' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', icon: '🟢', color: 'from-green-500 to-emerald-600' },
  { id: 'claude-sonnet', name: 'Claude Sonnet', provider: 'Anthropic', icon: '🟠', color: 'from-orange-500 to-amber-600' },
  { id: 'claude-haiku', name: 'Claude Haiku', provider: 'Anthropic', icon: '🟠', color: 'from-orange-500 to-amber-600' },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', icon: '🔵', color: 'from-blue-500 to-cyan-600' },
  { id: 'gemini-flash', name: 'Gemini Flash', provider: 'Google', icon: '🔵', color: 'from-blue-500 to-cyan-600' },
  { id: 'grok-2', name: 'Grok-2', provider: 'xAI', icon: '⚫', color: 'from-gray-500 to-gray-700' },
  { id: 'llama-3', name: 'Llama 3.1', provider: 'Meta', icon: '🟣', color: 'from-purple-500 to-violet-600' },
];

const SAMPLE_RESPONSES = {
  'gpt-4o': [
    "Tôi là GPT-4o của OpenAI. Tôi có thể giúp bạn với nhiều tác vụ từ viết code đến phân tích dữ liệu.",
    "Đây là một câu hỏi thú vị! GPT-4o có khả năng xử lý văn bản, hình ảnh và âm thanh.",
    "Bạn muốn tôi giúp gì? Tôi có thể viết code, dịch thuật, tóm tắt văn bản, và nhiều hơn nữa."
  ],
  'claude-sonnet': [
    "Xin chào! Tôi là Claude Sonnet của Anthropic. Tôi được thiết kế để an toàn và hữu ích.",
    "Câu hỏi hay! Claude Sonnet擅长 phân tích phức tạp và đưa ra câu trả lời chi tiết.",
    "Tôi có thể giúp bạn với phân tích, sáng tạo nội dung, và giải quyết vấn đề."
  ],
  'gemini-pro': [
    "Chào bạn! Gemini Pro đây. Tôi có thể xử lý nhiều loại dữ liệu khác nhau.",
    "Gemini Pro được tích hợp khả năng tìm kiếm Google để cung cấp thông tin mới nhất.",
    "Bạn cần hỗ trợ gì? Tôi có thể giúp từ tìm kiếm đến tạo nội dung."
  ],
  'grok-2': [
    "Hey! Grok-2 đây. Tôi thích trả lời thẳng thắn và không ngại nói sự thật.",
    "Câu hỏi hay! Grok-2擅长幽默 và phân tích xu hướng xã hội.",
    "Tôi ở đây để giúp! Hỏi tôi bất cứ điều gì."
  ],
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Xin chào! Chọn model AI và hỏi tôi bất cứ điều gì!', model: 'gpt-4o' }
  ]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [isTyping, setIsTyping] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const currentModel = AI_MODELS.find(m => m.id === selectedModel);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input.trim(), model: selectedModel };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = SAMPLE_RESPONSES[selectedModel] || SAMPLE_RESPONSES['gpt-4o'];
      const response = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: response, model: selectedModel }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] lg:h-screen">
      {/* Model Selector Bar */}
      <div className="border-b border-white/[0.06] px-4 py-2 flex items-center gap-3 bg-[#0d0b12]/80 backdrop-blur-xl shrink-0">
        <div className="relative">
          <button
            onClick={() => setShowModelPicker(!showModelPicker)}
            className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl px-3 py-2 text-sm transition-colors"
          >
            <span className="text-lg">{currentModel?.icon}</span>
            <div className="text-left">
              <div className="text-white font-semibold text-xs">{currentModel?.name}</div>
              <div className="text-gray-500 text-[10px]">{currentModel?.provider}</div>
            </div>
            <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* Dropdown */}
          {showModelPicker && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowModelPicker(false)} />
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#1a1725] border border-white/[0.08] rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="p-3 border-b border-white/[0.06]">
                  <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Chọn model AI</div>
                </div>
                <div className="p-2 max-h-[360px] overflow-y-auto">
                  {AI_MODELS.map(model => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.id);
                        setShowModelPicker(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                        selectedModel === model.id
                          ? 'bg-indigo-600/20 text-white'
                          : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      <span className="text-xl shrink-0">{model.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">{model.name}</div>
                        <div className="text-[11px] text-gray-500">{model.provider}</div>
                      </div>
                      {selectedModel === model.id && (
                        <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-5 w-px bg-white/[0.06]" />

        <span className="text-[11px] text-gray-600 hidden sm:block">
          {currentModel?.name} - {currentModel?.provider}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] lg:max-w-[65%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-br-md'
                : 'bg-white/[0.06] text-gray-300 border border-white/[0.06] rounded-bl-md'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/[0.06] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/[0.06] p-3 lg:p-4 bg-[#0d0b12]/80 backdrop-blur-xl shrink-0">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Hỏi ${currentModel?.name}...`}
            className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500/50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 lg:px-5 py-3 rounded-xl text-sm font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
