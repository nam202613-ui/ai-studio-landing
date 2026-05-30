import { useState, useRef, useEffect } from 'react';

const OpenAILogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M4.709 15.955l4.72-2.744.08-.046 2.803-1.629v3.225L4.71 17.588l-.001.001v-1.634zm0-3.311l4.72-2.744.08-.046 2.803-1.629v3.225l-4.72 2.744-.001.001v-1.634v-.145zm0-3.311l4.72-2.744.08-.046 2.803-1.629v3.225l-4.72 2.744-.001.001v-1.634v-.145zm9.582-2.973l-2.803-1.63-4.799 2.788v3.225l4.72 2.744.08.046 2.802-1.629V6.36zm-4.799 8.395l-4.799-2.787v3.224l4.72 2.744.08.046 2.802-1.629V11.04zm4.799 2.787l-4.799 2.788v3.225l4.72 2.744.08.046 2.802-1.629V13.827v-.145z"/>
  </svg>
);

const XAILogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const PerplexityLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-8h2v8zm-2-10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
);

const DeepSeekLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>
);

const PROVIDER_LOGOS = {
  openai: OpenAILogo,
  google: GoogleLogo,
  anthropic: ClaudeLogo,
  xai: XAILogo,
  perplexity: PerplexityLogo,
  deepseek: DeepSeekLogo,
};

const AI_PROVIDERS = [
  {
    id: 'openai', name: 'OpenAI', logo: PROVIDER_LOGOS.openai, color: '#10a37f',
    models: [
      { id: 'gpt-5.5-mini', name: 'GPT-5.5 Mini', desc: 'Mini dòng 5.5 — nhanh, rẻ, phù hợp ...', badge: '⚡' },
      { id: 'gpt-5', name: 'GPT-5', desc: 'Reasoning mạnh mẽ, 400K context ...' },
      { id: 'gpt-5.4-mini', name: 'GPT-5.4 mini', desc: 'Nhanh, rẻ — phù hợp chat realtime v...' },
      { id: 'gpt-5.4-nano', name: 'GPT-5.4 nano', desc: 'Cực nhanh, cực rẻ — phản hồi tức th...' },
      { id: 'gpt-5.5-thinking', name: 'GPT-5.5 Thinking', desc: 'Frontier GPT-5.5 — suy luận sâu, co...', badge: '🧠' },
      { id: 'gpt-5.4-thinking', name: 'GPT-5.4 Thinking', desc: 'Tự duy sâu — GPT-5.4 (bản cố định)', badge: '🧠' },
      { id: 'gpt-5.3', name: 'GPT-5.3', desc: 'Phiên bản mới GPT-5.3, cân bằng toc...', badge: '✨' },
      { id: 'gpt-5.2', name: 'GPT-5.2', desc: 'Mới nhất. Tốt nhất cho coding & age...', badge: '✨' },
      { id: 'gpt-5.1', name: 'GPT-5.1', desc: 'Reasoning thông minh, coding xuất s...', badge: '⭐' },
      { id: 'gpt-5-mini', name: 'GPT-5 Mini', desc: 'Phiên bản nhanh & tiết kiệm của GPT-5' },
      { id: 'gpt-5-nano', name: 'GPT-5 Nano', desc: 'Cực nhanh, cực rẻ, reasoning cơ bản' },
      { id: 'gpt-4.1', name: 'GPT-4.1', desc: 'Mô hình mới nhất, coding & instructi...', badge: '⭐' },
      { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', desc: 'Nhỏ gọn, nhanh, hiệu quả cao' },
      { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano', desc: 'Siêu nhỏ, siêu nhanh' },
      { id: 'gpt-4o', name: 'GPT-4o', desc: 'Mô hình đa phương tiện mạnh mẽ' },
    ]
  },
  {
    id: 'google', name: 'Google', logo: PROVIDER_LOGOS.google, color: '#4285F4',
    models: [
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', desc: 'Mô hình mạnh nhất của Google', badge: '⭐' },
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'Nhanh, miễn phí, tốt cho chat' },
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', desc: 'Nhanh hơn, tiết kiệm hơn' },
    ]
  },
  {
    id: 'anthropic', name: 'Claude', logo: PROVIDER_LOGOS.anthropic, color: '#d97757',
    models: [
      { id: 'claude-opus-4', name: 'Claude Opus 4', desc: 'Mô hình mạnh nhất, suy luận sâu', badge: '⭐' },
      { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', desc: 'Cân bằng giữa tốc độ và chất lượng' },
      { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', desc: 'Phân tích phức tạp, viết code tốt' },
      { id: 'claude-3.5-haiku', name: 'Claude 3.5 Haiku', desc: 'Cực nhanh, tiết kiệm' },
    ]
  },
  {
    id: 'xai', name: 'xAI', logo: PROVIDER_LOGOS.xai, color: '#1d1d1f',
    models: [
      { id: 'grok-3', name: 'Grok-3', desc: 'Mô hình mới nhất của xAI', badge: '⭐' },
      { id: 'grok-3-mini', name: 'Grok-3 Mini', desc: 'Nhanh, phù hợp chat thường ngày' },
      { id: 'grok-2', name: 'Grok-2', desc: 'Trực thắn, hài hước' },
    ]
  },
  {
    id: 'perplexity', name: 'Perplexity', logo: PROVIDER_LOGOS.perplexity, color: '#20b8cd',
    models: [
      { id: 'sonar-pro', name: 'Sonar Pro', desc: 'Tìm kiếm real-time, citation rõ ràng', badge: '⭐' },
      { id: 'sonar', name: 'Sonar', desc: 'Tìm kiếm nhanh, miễn phí' },
    ]
  },
  {
    id: 'deepseek', name: 'DeepSeek AI', logo: PROVIDER_LOGOS.deepseek, color: '#0066ff',
    models: [
      { id: 'deepseek-r1', name: 'DeepSeek R1', desc: 'Reasoning mạnh, mã nguồn mở', badge: '⭐' },
      { id: 'deepseek-v3', name: 'DeepSeek V3', desc: 'General purpose, nhanh' },
    ]
  },
];

const ALL_MODELS = AI_PROVIDERS.flatMap(p => p.models.map(m => ({ ...m, provider: p.name, providerLogo: p.logo, providerColor: p.color })));

const SAMPLE_RESPONSES = [
  "Xin chào! Tôi có thể giúp bạn với nhiều tác vụ từ viết code đến phân tích dữ liệu. Bạn cần gì?",
  "Đây là một câu hỏi thú vị! Tôi sẽ xử lý và đưa ra câu trả lời chi tiết nhất.",
  "Bạn muốn tôi giúp gì? Tôi có thể viết code, dịch thuật, tóm tắt văn bản, và nhiều hơn nữa.",
  "Cảm ơn bạn đã hỏi! Dưới đây là câu trả lời dựa trên kiến thức của tôi.",
  "Hay lắm! Để tôi phân tích và đưa ra câu trả lời tốt nhất cho bạn.",
];

const ChatBot = () => {
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(AI_PROVIDERS[0]);
  const [selectedModel, setSelectedModel] = useState(AI_PROVIDERS[0].models[0]);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
  };

  const loadChat = (chatId) => {
    const chat = conversations.find(c => c.id === chatId);
    if (chat) {
      setActiveChatId(chatId);
      setMessages(chat.messages);
      setSelectedModel(AI_PROVIDERS.flatMap(p => p.models).find(m => m.id === chat.modelId) || AI_PROVIDERS[0].models[0]);
    }
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(c => c.id !== chatId));
    if (activeChatId === chatId) {
      setActiveChatId(null);
      setMessages([]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
      const assistantMsg = { role: 'assistant', content: response };
      const finalMessages = [...newMessages, assistantMsg];
      setMessages(finalMessages);
      setIsTyping(false);

      if (!activeChatId) {
        const newChat = {
          id: Date.now(),
          title: input.trim().slice(0, 35) + (input.length > 35 ? '...' : ''),
          modelId: selectedModel.id,
          modelName: selectedModel.name,
          providerName: selectedProvider.name,
          time: 'Vừa xong',
          messages: finalMessages,
        };
        setConversations(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
      } else {
        setConversations(prev => prev.map(c =>
          c.id === activeChatId ? { ...c, messages: finalMessages } : c
        ));
      }
    }, 1000 + Math.random() * 1500);
  };

  const selectModel = (provider, model) => {
    setSelectedProvider(provider);
    setSelectedModel(model);
    setShowModelPicker(false);
  };

  const hasMessages = messages.length > 0;

  const ModelLogo = selectedProvider.logo;

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Left Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-[#0d0b12] border-r border-white/[0.06] flex flex-col transition-all duration-300 overflow-hidden shrink-0`}>
        {/* New Chat Button */}
        <div className="p-3 shrink-0">
          <button
            onClick={startNewChat}
            className="w-full flex items-center justify-center gap-2 bg-[#ff6b00] hover:bg-[#ff7a1a] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Cuộc trò chuyện mới
          </button>
        </div>

        {/* Sidebar Toggle */}
        <div className="px-3 mb-1">
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-400 text-xs px-2 py-1.5 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-2">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm">Chưa có cuộc hội thoại nào</p>
            </div>
          ) : (
            <div className="space-y-0.5 py-1">
              {conversations.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => loadChat(chat.id)}
                  className={`group w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors relative ${
                    activeChatId === chat.id
                      ? 'bg-white/[0.06] text-white'
                      : 'text-gray-500 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="truncate font-medium text-[13px] pr-6">{chat.title}</div>
                  <div className="text-[11px] text-gray-600 mt-0.5">{chat.modelName} • {chat.time}</div>
                  <button
                    onClick={(e) => deleteChat(chat.id, e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Collapsed Sidebar Toggle */}
      {!sidebarOpen && (
        <div className="hidden lg:flex flex-col items-center py-3 px-1.5 bg-[#0d0b12] border-r border-white/[0.06] shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors mb-1"
            title="Mở sidebar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={startNewChat}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
            title="Cuộc trò chuyện mới"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-12 border-b border-white/[0.06] flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setShowModelPicker(!showModelPicker)}
                className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl px-3 py-1.5 text-sm transition-colors"
              >
                <span className="text-gray-400"><ModelLogo /></span>
                <span className="text-white font-medium">{selectedModel.name}</span>
                {selectedModel.badge && <span className="text-xs">{selectedModel.badge}</span>}
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${showModelPicker ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Model Picker Dropdown */}
              {showModelPicker && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowModelPicker(false)} />
                  <div className="absolute top-full left-0 mt-2 w-[520px] bg-[#1a1725] border border-white/[0.08] rounded-2xl shadow-2xl z-50 flex overflow-hidden max-h-[480px]">
                    {/* Providers List */}
                    <div className="w-36 border-r border-white/[0.06] p-2 shrink-0">
                      <div className="text-[10px] text-gray-600 font-bold uppercase tracking-wider px-3 py-2">Models</div>
                      {AI_PROVIDERS.map(provider => {
                        const ProviderLogo = provider.logo;
                        return (
                          <button
                            key={provider.id}
                            onClick={() => setSelectedProvider(provider)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedProvider.id === provider.id
                                ? 'bg-white/[0.08] text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                            }`}
                          >
                            <span className="shrink-0"><ProviderLogo /></span>
                            <span className="truncate text-[13px]">{provider.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Models List */}
                    <div className="flex-1 overflow-y-auto p-2">
                      {selectedProvider.models.map(model => (
                        <button
                          key={model.id}
                          onClick={() => selectModel(selectedProvider, model)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                            selectedModel.id === model.id
                              ? 'bg-[#ff6b00]/10 border border-[#ff6b00]/30'
                              : 'hover:bg-white/[0.04]'
                          }`}
                        >
                          <span className="text-gray-500 shrink-0"><selectedProvider.logo /></span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-semibold text-white">{model.name}</span>
                              {model.badge && <span className="text-xs">{model.badge}</span>}
                            </div>
                            <div className="text-[11px] text-gray-600 truncate">{model.desc}</div>
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
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Credits */}
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-yellow-500">⚡</span>
              <span className="text-white font-semibold">0/30</span>
              <span className="text-[11px] text-gray-500">-1 Credit</span>
            </div>

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Xin chào, Nam. ヾ(≧▽≦*)o</h1>
            <p className="text-gray-500 text-base">Chọn một mô hình để bắt đầu đoạn chat mới.</p>
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
