
import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, User, Loader2 } from 'lucide-react';
import { Message } from '../types';
import { getAIResponse } from '../services/gemini';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "پیوند عصبی برقرار شد. من دستیار هوشمند شایان هستم. چطور می‌توانم کمک کنم؟" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    const response = await getAIResponse(messages, userMessage);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col gap-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
           <Cpu size={20} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">دستیار هوشمند</h2>
          <p className="text-[8px] md:text-[10px] text-gray-500 tracking-widest uppercase">عیب‌یابی سیستم</p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col bg-white/5 border border-white/10 rounded-[30px] md:rounded-[40px] backdrop-blur-md relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`max-w-[85%] md:max-w-[80%] flex items-start gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-indigo-600/30 text-indigo-400' : 'bg-pink-600/30 text-pink-400'
                }`}>
                  {msg.role === 'user' ? <User size={14} /> : <Cpu size={14} />}
                </div>
                <div className={`p-3 md:p-5 rounded-2xl md:rounded-3xl border leading-relaxed text-xs md:text-sm text-right ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-100 rounded-tl-none' 
                    : 'bg-white/5 border-white/10 text-gray-300 rounded-tr-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-end">
               <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 italic text-[10px] md:text-xs flex-row-reverse">
                  <Loader2 size={12} className="animate-spin" />
                  <span>در حال پردازش...</span>
               </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 md:p-6 bg-black/20 border-t border-white/10">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="بپرسید..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl py-3 md:py-4 pr-5 md:pr-6 pl-14 md:pl-16 text-xs md:text-sm focus:outline-none focus:border-indigo-500/50 backdrop-blur-xl text-right"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="absolute left-1.5 top-1.5 w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
            >
              <Send size={16} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
