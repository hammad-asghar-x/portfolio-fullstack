'use client';
import { useState, useEffect, useRef } from 'react';
import Icon from '../ui/Icon';

export default function ChatbotWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm the portfolio assistant. Ask me anything about Hammad 🙂", isUser: false }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAsk = async (question: string) => {
    if (!question.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: question, isUser: true }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: question,
          session_id: sessionId
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Save session ID for conversation continuity
        setSessionId(data.session_id);
        // Add bot response
        setMessages(prev => [...prev, { text: data.answer, isUser: false }]);
      } else {
        setMessages(prev => [...prev, { text: "Sorry, I encountered an error. Please try again.", isUser: false }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { text: "I'm having trouble connecting to the server. Please try again later.", isUser: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {showBubble && !chatOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 z-40 bg-[#151515] border border-[#3a2f18] rounded-xl px-4 py-2.5 text-xs gold shadow-2xl backdrop-blur-sm flex items-center max-w-[calc(100vw-2rem)]">
          Want to know about me?
          <button onClick={() => setShowBubble(false)} className="text-gray-500 ml-2 hover:text-white">×</button>
        </div>
      )}
      
      <button 
        onClick={() => { setChatOpen(!chatOpen); if (!chatOpen) setShowBubble(false); }}
        className="fixed bottom-6 right-4 md:right-6 z-40 w-16 h-16"
        style={{ animation: 'bob 3s ease-in-out infinite' }}
        title="Chat with me"
      >
        <svg viewBox="0 0 64 64" className="drop-shadow-[0_0_15px_rgba(232,180,76,0.4)]">
          <rect x="14" y="22" width="36" height="28" rx="8" fill="#151515" stroke="#E8B44C" strokeWidth="2" />
          <rect x="22" y="32" width="6" height="8" rx="3" fill="#E8B44C" />
          <rect x="36" y="32" width="6" height="8" rx="3" fill="#E8B44C" />
          <path d="M32 22v-6" stroke="#E8B44C" strokeWidth="2" />
          <circle cx="32" cy="13" r="3" fill="#E8B44C" />
          <rect x="8" y="30" width="6" height="12" rx="3" fill="#151515" stroke="#E8B44C" strokeWidth="2" />
          <rect x="50" y="30" width="6" height="12" rx="3" fill="#151515" stroke="#E8B44C" strokeWidth="2" />
        </svg>
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 z-40 w-[calc(100vw-2rem)] md:w-[calc(100vw-3rem)] max-w-sm h-[70vh] modern-card rounded-2xl flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-[#262626]">
            <div className="w-9 h-9 rounded-lg bg-[#151515] border border-[#262626] grid place-items-center gold font-bold shrink-0">AI</div>
            <div className="min-w-0">
              <div className="text-sm font-semibold">Portfolio Assistant</div>
              <div className="text-[10px] text-green-400">● online</div>
            </div>
            <button onClick={() => setChatOpen(false)} className="ml-auto text-gray-500 hover:text-white transition-colors">
              <Icon id="x" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`${msg.isUser ? 'bg-[#1a150a] border-[#3a2f18] rounded-tr-none ml-auto gold font-medium' : 'bg-[#151515] border-[#262626] rounded-tl-none text-[#a3a3a3] font-light'} border rounded-xl p-3 max-w-[85%]`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-1 p-2">
                <span className="tdot"></span><span className="tdot"></span><span className="tdot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
            {!isTyping && messages.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {["What are your skills?", "What projects have you built?", "How can I contact you?"].map((q, i) => (
                  <button key={i} onClick={() => handleAsk(q)} className="text-xs gold border border-[#3a2f18] rounded-full px-3 py-1.5 hover:bg-[#1a150a] transition-colors">{q}</button>
                ))}
              </div>
            )}
          </div>

          <form className="p-3 border-t border-[#262626] flex gap-2" onSubmit={(e) => { e.preventDefault(); handleAsk(chatInput); }}>
            <input 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)}
              required 
              placeholder="Ask me anything…" 
              className="flex-1 min-w-0 bg-transparent border-b border-[#262626] focus:border-[#E8B44C] py-2 text-sm placeholder-gray-500 transition-colors" 
            />
            <button type="submit" className="gold hover:text-white transition-colors shrink-0">
              <Icon id="send" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}