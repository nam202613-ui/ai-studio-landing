import { useState, useRef, useEffect } from 'react';

const AI_MODELS = [
  { id: 'gpt-5.5-mini', name: 'GPT-5.5 Mini', desc: 'Mini dòng 5.5 — nhanh, rẻ, phù hợp ...', badge: '⚡', provider: 'OpenAI' },
  { id: 'gpt-5', name: 'GPT-5', desc: 'Reasoning mạnh mẽ, 400K context ...', provider: 'OpenAI' },
  { id: 'gpt-5.4-mini', name: 'GPT-5.4 mini', desc: 'Nhanh, rẻ — phù hợp chat realtime v...', provider: 'OpenAI' },
  { id: 'gpt-5.4-nano', name: 'GPT-5.4 nano', desc: 'Cực nhanh, cực rẻ — phản hồi tức th...', provider: 'OpenAI' },
  { id: 'gpt-5.5-thinking', name: 'GPT-5.5 Thinking', desc: 'Frontier GPT-5.5 — suy luận sâu, co...', badge: '🧠', provider: 'OpenAI' },
  { id: 'gpt-5.4-thinking', name: 'GPT-5.4 Thinking', desc: 'Tự duy sâu — GPT-5.4 (bản cố định)', badge: '🧠', provider: 'OpenAI' },
  { id: 'gpt-5.3', name: 'GPT-5.3', desc: 'Phiên bản mới GPT-5.3, cân bằng toc...', badge: '✨', provider: 'OpenAI' },
  { id: 'gpt-5.2', name: 'GPT-5.2', desc: 'Mới nhất. Tốt nhất cho coding & age...', badge: '✨', provider: 'OpenAI' },
  { id: 'gpt-5.1', name: 'GPT-5.1', desc: 'Reasoning thông minh, coding xuất s...', badge: '⭐', provider: 'OpenAI' },
  { id: 'gpt-5-mini', name: 'GPT-5 Mini', desc: 'Phiên bản nhanh & tiết kiệm của GPT-5', provider: 'OpenAI' },
  { id: 'gpt-5-nano', name: 'GPT-5 Nano', desc: 'Cực nhanh, cực rẻ, reasoning cơ bản', provider: 'OpenAI' },
  { id: 'gpt-4.1', name: 'GPT-4.1', desc: 'Mô hình mới nhất, coding & instructi...', badge: '⭐', provider: 'OpenAI' },
  { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', desc: 'Nhỏ gọn, nhanh, hiệu quả cao', provider: 'OpenAI' },
  { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano', desc: 'Siêu nhỏ, siêu nhanh', provider: 'OpenAI' },
  { id: 'gpt-4o', name: 'GPT-4o', desc: 'Mô hình đa phương tiện mạnh mẽ', provider: 'OpenAI' },
  { id: 'claude-sonnet', name: 'Claude Sonnet', desc: 'Anthropic — phân tích phức tạp', provider: 'Anthropic' },
  { id: 'claude-haiku', name: 'Claude Haiku', desc: 'Anthropic — nhanh, tiết kiệm', provider: 'Anthropic' },
  { id: 'gemini-pro', name: 'Gemini Pro', desc: 'Google — tìm kiếm real-time', provider: 'Google' },
  { id: 'gemini-flash', name: 'Gemini Flash', desc: 'Google — siêu nhanh', provider: 'Google' },
  { id: 'grok-2', name: 'Grok-2', desc: 'xAI — thẳng thắn, hài hước', provider: 'xAI' },
  { id: 'llama-3.1', name: 'Llama 3.1', desc: 'Meta — mã nguồn mở', provider: 'Meta' },
];

const SAMPLE_RESPONSES = [
  "Xin chào! Tôi có thể giúp bạn với nhiều tác vụ từ viết code đến phân tích dữ liệu. Bạn cần gì?",
  "Đây là một câu hỏi thú vị! Tôi sẽ xử lý và đưa ra câu trả lời chi tiết nhất.",
  "Bạn muốn tôi giúp gì? Tôi có thể viết code, dịch thuật, tóm tắt văn bản, và nhiều hơn nữa.",
  "Cảm ơn bạn đã hỏi! Dưới đây là câu trả lời dựa trên kiến thức của tôi.",
  "Hay lắm! Để tôi phân tích và đưa ra câu trả lời tốt nhất cho bạn.",
];

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    if (!currentChatId) {
      const chatId = Date.now();
      setCurrentChatId(chatId);
      setChatHistory(prev => [{
        id: chatId,
        title: input.trim().slice(0, 40) + (input.length > 40 ? '...' : ''),
        model: selectedModel.name,
        time: 'Vừa xong'
      }, ...prev]);
    }

    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <div className="h-12 border-b border-white/[0.06] flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setShowModelPicker(!showModelPicker)}
                className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl px-3 py-1.5 text-sm transition-colors"
              >
                <span className="text-gray-400">⚙️</span>
                <span className="text-white font-medium">{selectedModel.name}</span>
                {selectedModel.badge && <span className="text-xs">{selectedModel.badge}</span>}
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {showModelPicker && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowModelPicker(false)} />
                  <div className="absolute top-full left-0 mt-2 w-80 bg-[#1a1725] border border-white/[0.08] rounded-2xl shadow-2xl z-50 max-h-[400px] overflow-y-auto">
                    <div className="p-3 border-b border-white/[0.06] sticky top-0 bg-[#1a1725]">
                      <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Chọn mô hình</div>
                    </div>
                    <div className="p-2">
                      {AI_MODELS.map(model => (
                        <button
                          key={model.id}
                          onClick={() => {
                            setSelectedModel(model);
                            setShowModelPicker(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                            selectedModel.id === model.id
                              ? 'bg-indigo-600/20 text-white'
                              : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
                          }`}
                        >
                          <span className="text-gray-500">⚙️</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-semibold">{model.name}</span>
                              {model.badge && <span className="text-xs">{model.badge}</span>}
                            </div>
                            <div className="text-[11px] text-gray-600 truncate">{model.desc}</div>
                          </div>
                          {selectedModel.id === model.id && (
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
          </div>

          <div className="flex items-center gap-3">
            {/* New Chat */}
            <button
              onClick={startNewChat}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="hidden sm:inline">New Chat</span>
            </button>
          </div>
        </div>

        {/* Messages or Welcome */}
        {!hasMessages ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Xin chào, Nam.</h1>
            <p className="text-gray-500 text-base mb-8">Chọn một mô hình để bắt đầu đoạn chat mới.</p>
            <p className="text-gray-600 text-sm mb-6">Đang hiển thị {AI_MODELS.length} mô hình</p>

            {/* Model Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-4xl">
              {AI_MODELS.slice(0, 15).map(model => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model);
                    document.querySelector('.chat-input')?.focus();
                  }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                    selectedModel.id === model.id
                      ? 'bg-[#1e1a2e] border-[#ff6b00]/40 ring-1 ring-[#ff6b00]/20'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]'
                  }`}
                >
                  <span className="text-gray-500 text-lg shrink-0">⚙️</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-semibold text-sm">{model.name}</span>
                      {model.badge && <span className="text-xs">{model.badge}</span>}
                    </div>
                    <div className="text-[11px] text-gray-500 truncate mt-0.5">{model.desc}</div>
                  </div>
                  {selectedModel.id === model.id && (
                    <div className="w-5 h-5 rounded-full bg-[#ff6b00] flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] lg:max-w-[65%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#ff6b00] text-white rounded-br-md'
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
        )}

        {/* Input Area */}
        <div className="p-4 shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden">
              <div className="flex items-end">
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Nhập câu hỏi..."
                  className="chat-input flex-1 bg-transparent text-white placeholder:text-gray-500 text-sm px-4 py-3 focus:outline-none resize-none max-h-[120px]"
                  rows={1}
                />
                <div className="flex items-center gap-1 px-2 py-2">
                  <button className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="p-2 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-white/[0.06]"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center gap-2 px-4 py-2 border-t border-white/[0.04]">
                <button className="p-1.5 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:text-white text-xs rounded-lg hover:bg-white/[0.06] transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
