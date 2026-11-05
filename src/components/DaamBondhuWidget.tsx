import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, Calculator, HelpCircle, ArrowRight, BookOpen, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionLink?: {
    label: string;
    url: string;
  };
}

export const DaamBondhuWidget: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        language === 'bn'
          ? 'নমস্কার / আসসালামু আলাইকুম! আমি "দামবন্ধু" — শিল্প বাজারের ডিজিটাল সহকারী। আপনার পণ্য সঠিক মূল্যে বিক্রি, সুন্দর বিবরণ লেখা কিংবা AI-মুক্ত খাঁটি ছবির নিয়ম জানতে আমাকে যেকোনো প্রশ্ন করতে পারেন।'
          : 'Hello! I am "DaamBondhu" — your trusted Shilpo Bajar business companion. Ask me anything about fair pricing formulas, craft listing descriptions, or our authentic photo policies!',
    },
  ]);

  const quickPrompts = [
    {
      labelBn: 'হাতের কাজের সঠিক দাম কীভাবে নির্ধারণ করব?',
      labelEn: 'How to calculate fair handmade price?',
      prompt: 'হাতের কাজের সঠিক দাম কীভাবে নির্ধারণ করব?',
      replyBn:
        'শিল্প বাজারের সুবর্ণ নিয়ম হলো:\nমোট খরচ = উপকরণের দাম + (কাজের মোট ঘণ্টা × প্রতি ঘণ্টার পারিশ্রমিক) + অন্যান্য খরচ।\nএরপর এর সাথে ১৫% থেকে ২৫% ন্যায্য লভ্যাংশ যোগ করে বিক্রয়মূল্য নির্ধারণ করবেন। মনে রাখবেন, আপনার সময় ও মেধা অমূল্য!',
      action: { label: 'ক্যালকুলেটর খুলুন', url: '/seller/pricing-calculator' },
    },
    {
      labelBn: 'কেন AI ছবি এখানে নিষিদ্ধ?',
      labelEn: 'Why are AI images banned?',
      prompt: 'কেন AI ছবি এখানে নিষিদ্ধ?',
      replyBn:
        'AI ছবি দেখতে নিখুঁত হলেও ক্রেতাকে বিভ্রান্ত করে। তারা ছবিতে একরকম দেখে এবং হাতে পাওয়ার পর কাপড়ের টেক্সচার বা মাটির রঙ অমিল পেয়ে হতাশ হয়। তাই শিল্প বাজারে শুধুমাত্র সাধারণ মোবাইল ক্যামেরায় তোলা বাস্তব পণ্যের ছবি গ্রহণযোগ্য।',
    },
    {
      labelBn: 'নকশিকাঁথার একটি সুন্দর বিবরণ লিখে দাও',
      labelEn: 'Write description for Nakshi Kantha',
      prompt: 'নকশিকাঁথার একটি আকর্ষণীয় বিবরণ লিখে দাও',
      replyBn:
        'বিবরণ খসড়া:\n"১০০% প্রাকৃতিক সুতি কাপড়ে লাল, হলুদ ও সবুজ লাচ্ছি সুতোর নিপুণ ফোঁড়ে তৈরি এই নকশিকাঁথা। এতে গ্রামের নদী ও পদ্মফুলের চিরায়ত নকশা ফুটিয়ে তোলা হয়েছে। প্রায় ১২ ঘণ্টার নিরবচ্ছিন্ন পরিশ্রমে বোনা এই কাঁথাটি নবজাতক শিশু কিংবা ঘরের শোভা বৃদ্ধির জন্য এক অনন্য শিল্পকর্ম।"',
    },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Process friendly deterministic AI response
    setTimeout(() => {
      let reply = '';
      let actionLink: { label: string; url: string } | undefined = undefined;
      const lower = text.toLowerCase();

      if (lower.includes('দাম') || lower.includes('price') || lower.includes('calculator') || lower.includes('খরচ')) {
        reply =
          language === 'bn'
            ? 'হাতের কাজের দাম ঠিক করার সময় কখনো নিজের শ্রম ঘণ্টার দাম বাদ দেবেন না। আপনি প্রতি ঘণ্টায় ন্যূনতম ৮০-১৫০ টাকা পারিশ্রমিক ধরতে পারেন। আমাদের মূল্য ক্যালকুলেটর ব্যবহার করে এখনই নিখুঁত দাম বের করে নিন।'
            : 'Never omit your hourly craft rate! We recommend calculating at least 80-150 BDT/hour depending on technique complexity. Open our Fair Price Calculator to get exact numbers.';
        actionLink = {
          label: language === 'bn' ? 'ন্যায্য মূল্য ক্যালকুলেটরে যান' : 'Go to Pricing Calculator',
          url: '/seller/pricing-calculator',
        };
      } else if (lower.includes('ছবি') || lower.includes('photo') || lower.includes('image') || lower.includes('ai')) {
        reply =
          language === 'bn'
            ? 'আসল ছবি তোলার পরামর্শ:\n১. দিনের প্রাকৃতিক আলো বা জানালার পাশে রেখে মোবাইল দিয়ে তুলুন।\n২. কোনো বিউটি ফিল্টার বা AI স্মুদিং ব্যবহার করবেন না।\n৩. পণ্যের আসল সুতা ও মাটির খাঁটি টেক্সচার স্পষ্ট রাখুন।'
            : 'Tips for authentic photos:\n1. Shoot beside natural window light.\n2. Avoid beauty/smoothing filters or AI upscalers.\n3. Keep the natural grain of fabric and clay visible.';
      } else if (lower.includes('বিবরণ') || lower.includes('description') || lower.includes('বর্ণনা')) {
        reply =
          language === 'bn'
            ? 'পণ্য আপলোড করার সময় আমাদের "দামবন্ধু AI বিবরণ জেনারেটর" স্বয়ংক্রিয়ভাবে একটি চমৎকার বাংলা ও ইংরেজি বিবরণ লিখে দেবে যা আপনি প্রকাশ করার আগে এডিট বা পছন্দ অনুযায়ী ঠিক করে নিতে পারবেন।'
            : 'During product upload, DaamBondhu can instantly draft expressive descriptions honoring your materials and story for you to review and publish.';
        actionLink = {
          label: language === 'bn' ? 'পণ্য যোগ করার পেইজে যান' : 'Add New Product',
          url: '/seller/products/new',
        };
      } else {
        reply =
          language === 'bn'
            ? 'আমি সবসময় আপনার সেবায় প্রস্তুত। আপনার যে কোনো সমস্যা, যেমন পণ্যের দাম নির্ধারণ, সুন্দর বিবরণ বা অর্ডার সংক্রান্ত পরামর্শের জন্য আমাকে নির্দ্বিধায় জানান।'
            : 'I am always right here by your side to support fair pricing, listing craft narratives, and handling customer orders.';
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        actionLink,
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-mustard-300"
          title="Open DaamBondhu AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-mustard-300 animate-pulse" />
          </div>
          <span className="font-bangla text-sm">
            {language === 'bn' ? 'দামবন্ধু (AI)' : 'DaamBondhu'}
          </span>
        </button>
      </div>

      {/* Slide-in Assistant Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 max-h-[580px] h-[540px] bg-white rounded-2xl shadow-2xl border border-craft-border flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-terracotta-500 border border-mustard-400 flex items-center justify-center font-bold text-lg text-white">
                শি
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  <span>{language === 'bn' ? 'দামবন্ধু AI' : 'DaamBondhu AI'}</span>
                  <span className="text-[10px] bg-mustard-500 text-indigo-900 font-bold px-1.5 py-0.2 rounded">
                    বাংলা
                  </span>
                </h4>
                <p className="text-[11px] text-ivory-200">
                  {language === 'bn' ? 'শিল্প বাজার সহকারী' : 'Shilpo Bajar Advisor'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-ivory-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-ivory-50 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3 rounded-2xl leading-relaxed whitespace-pre-line shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-terracotta-500 text-white rounded-br-none'
                      : 'bg-white text-craft-text border border-craft-border rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.actionLink && (
                    <button
                      onClick={() => {
                        navigate(msg.actionLink!.url);
                        setIsOpen(false);
                      }}
                      className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-terracotta-600 hover:text-terracotta-700 bg-terracotta-50 hover:bg-terracotta-100 py-1.5 px-3 rounded-lg border border-terracotta-200 transition"
                    >
                      <span>{msg.actionLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-2.5 bg-white border-t border-craft-border/60">
            <span className="text-[10px] font-semibold text-craft-muted uppercase tracking-wider block mb-1.5 px-1">
              {language === 'bn' ? 'দ্রুত পরামর্শ' : 'Quick Actions'}:
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp.prompt)}
                  className="whitespace-nowrap text-[11px] bg-ivory-100 hover:bg-terracotta-50 hover:text-terracotta-700 text-craft-text py-1 px-2.5 rounded-full border border-craft-border transition flex-shrink-0"
                >
                  {language === 'bn' ? qp.labelBn : qp.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-craft-border flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={
                language === 'bn'
                  ? 'দামবন্ধু-কে বাংলায় যেকোনো প্রশ্ন করুন...'
                  : 'Ask DaamBondhu in Bangla or English...'
              }
              className="flex-1 text-xs bg-ivory-100 border border-craft-border rounded-full py-2 px-3.5 focus:outline-none focus:ring-1 focus:ring-terracotta-400"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-full transition shadow flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
