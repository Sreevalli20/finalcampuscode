import React, { useState } from 'react';
import { Bot, Send, HelpCircle, ShieldCheck, Sparkles, BookOpen, User } from 'lucide-react';
import { SEED_RULEBOT_KNOWLEDGE } from '../../services/seedData';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  category?: string;
  timestamp: string;
}

export const RuleBotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Greetings! I am RuleBot, your verified local knowledge assistant for ReBuild '26 and CampusCode hackathons. Ask me about eligibility, team size limits, submission deadlines, required GitHub formats, or intellectual property terms.",
      category: 'System',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [query, setQuery] = useState('');

  const suggestedQuestions = [
    'Who is eligible to participate?',
    'What is the maximum team size for ReBuild 26?',
    'What are the required deliverables for Round 2?',
    'Who owns the intellectual property?',
    'Are open-source libraries permitted?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || query).trim();
    if (!text) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery('');

    // Query local knowledge index
    setTimeout(() => {
      let matched = SEED_RULEBOT_KNOWLEDGE.find((item) => item.questionPattern.test(text));

      let botAnswer: string;
      let category = 'Official Rule Index';

      if (matched) {
        botAnswer = matched.answer;
        category = matched.category;
      } else {
        botAnswer =
          "This specific query is not present in the verified ReBuild '26 local rule handbook. To ensure strict adherence to official competition rules without invented assumptions, please consult the Student Guide (/workspace/guide) or message the organizing committee via Help & Support.";
        category = 'Rule Verification';
      }

      const botMsg: Message = {
        sender: 'bot',
        text: botAnswer,
        category,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 200);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="text-amber-400 font-bold">INNOVATION TOOL</span>
          <span>·</span>
          <span>VERIFIED LOCAL KNOWLEDGE ASSISTANT</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          RuleBot — Event Rules & Guidelines Assistant
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
          Queries verified local competition documentation for ReBuild '26 with zero hallucinations. Never fabricates official instructions.
        </p>
      </div>

      {/* Suggested Quick Questions */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-neutral-500 uppercase font-semibold">
          Frequently Inquired Rule Topics:
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-500/30 transition-colors text-left cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Log Window */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 flex flex-col h-[460px] overflow-hidden shadow-xl">
        <div className="p-3.5 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">RuleBot Session</span>
            <span className="text-neutral-500 font-mono text-[10px]">ReBuild '26 Index v2.1</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">100% Deterministic Knowledge</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-lg rounded-2xl p-4 text-xs leading-relaxed space-y-1.5 shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-neutral-950 font-medium'
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-200'
                }`}
              >
                {m.category && (
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-60 pb-1 border-b border-current/10">
                    <span>{m.category}</span>
                    <span>{m.timestamp}</span>
                  </div>
                )}
                <p>{m.text}</p>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about rules, deadlines, or teams..."
            className="flex-1 px-4 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
          />
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask</span>
          </button>
        </form>
      </div>
    </div>
  );
};
