import { useState, useRef, useEffect } from 'react';

const SAMPLE_RESPONSES = [
  "Xin chào! Tôi là AI Assistant của AI Studio. Tôi có thể giúp bạn tạo ảnh, video, hoặc trả lời câu hỏi. Bạn cần gì?",
  "Để tạo ảnh AI, bạn chỉ cần mô tả bức ảnh bạn muốn bằng tiếng Việt hoặc tiếng Anh. Ví dụ: 'Một chú mèo đang ngồi trên mặt trăng trong không gian'.",
  "Tính năng Remix Video cho phép bạn tải lên video có sẵn và AI sẽ phân tích, viết lại kịch bản, tìm video stock phù hợp để tạo ra video mới hoàn toàn.",
  "Bạn có biết? AI Studio sử dụng các mô hình tiên tiến nhất như GPT-4o, Claude Sonnet và Gemini để đảm bảo chất lượng đầu ra tốt nhất.",
  "Để tạo video từ ảnh, hãy tải lên ảnh của bạn và chọn phong cách video. AI sẽ tự động thêm hiệu ứng, nhạc nền và chuyển cảnh.",
];

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Xin chào! Tôi là AI Assistant. Hỏi tôi bất cứ điều gì về tạo ảnh, video, hoặc sử dụng AI Studio!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
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
      <div className="border-t border-white/[0.06] p-4 bg-[#120F17]/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập tin nhắn..."
            className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500/50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
