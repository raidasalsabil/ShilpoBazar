import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  Bot,
  Send,
  Calculator,
  ShieldCheck,
  FileText,
  HelpCircle,
  Copy,
  Check,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionLink?: {
    label: string;
    url: string;
  };
}

export const DaamBondhuAssistantPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text:
        language === 'bn'
          ? 'আসসালামু আলাইকুম / আদাব! আমি "দামবন্ধু" (DaamBondhu) — শিল্প বাজারের বাংলা হস্তশিল্প ব্যবসা সহকারী।\n\nআমি আপনাকে যেভাবে সাহায্য করতে পারি:\n১. আপনার কাজের শ্রমঘণ্টা ও কাঁচামাল হিসাব করে সঠিক ন্যায্য মূল্য নির্ধারণ করা।\n২. পণ্যের জন্য সুন্দর ও আকর্ষণীয় বাংলা/ইংরেজি বিবরণ লিখে দেওয়া।\n৩. কেন AI ছবি নিষিদ্ধ এবং কীভাবে মোবাইলে আসল ছবি তুলবেন তা বুঝিয়ে বলা।\n৪. আপনার দোকান পরিচালনা ও অর্ডার ব্যবস্থাপনায় দিকনির্দেশনা দেওয়া।'
          : 'Welcome! I am "DaamBondhu" — your dedicated Bangla-first handmade business advisor for Shilpo Bajar.\n\nI can assist you with:\n1. Fair labor and material pricing formulas.\n2. Writing evocative product narratives in Bangla or English.\n3. Guidance on our camera-only authentic photo policies.\n4. Managing orders and packaging advice.',
    },
  ]);

  const promptCategories = [
    {
      titleBn: 'দামের পরামর্শ',
      titleEn: 'Pricing Guidance',
      prompts: [
        'আমি ৫ দিন ধরে একটি নকশিকাঁথা সেলাই করেছি, এর ন্যায্য দাম কত হওয়া উচিত?',
        'আমার পণ্যে কাপড়ের দাম ৩০০ টাকা আর সময় লেগেছে ৬ ঘণ্টা, কীভাবে দাম ধরব?',
        'ক্রেতারা দামাদামি করলে কীভাবে কাজের মূল্যায়ন বোঝাব?',
      ],
    },
    {
      titleBn: 'পণ্যের আকর্ষণীয় বিবরণ',
      titleEn: 'Craft Descriptions',
      prompts: [
        'মাটির চায়ের কাপ সেটের জন্য একটি সুন্দর বিবরণ লিখে দাও',
        'শিশুদের ক্রুশের অ্যামিগুরুমি পুতুলের বিবরণ তৈরি করো',
        'হাতে তৈরি পিতল ও টেরাকোটা গহনার বর্ণনা চাই',
      ],
    },
    {
      titleBn: 'ছবি ও শপ গাইড',
      titleEn: 'Photos & Storefront',
      prompts: [
        'কেন AI ছবি শিল্প বাজারে নিষিদ্ধ?',
        'সাধারণ মোবাইল দিয়ে কীভাবে আকর্ষণীয় ছবি তুলব?',
        'অর্ডার পাওয়ার পর প্যাকেজিং কীভাবে করব?',
      ],
    },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');

    // Generate smart context-aware response
    setTimeout(() => {
      let reply = '';
      let actionLink: { label: string; url: string } | undefined = undefined;
      const lower = text.toLowerCase();

      if (lower.includes('কাঁথা') || lower.includes('kantha')) {
        reply =
          language === 'bn'
            ? 'নকশিকাঁথার মূল্যায়ন:\n৫ দিনের কাজ মানে গড়ে ২৫-৩০ ঘণ্টা নিবিষ্ট শ্রম। যদি আপনার কাপড়ের খরচ ৫০০ টাকা হয় এবং প্রতি ঘণ্টায় ন্যূনতম ৮০ টাকা পারিশ্রমিক ধরেন, তবে:\n• শ্রমমূল্য = ২৫ × ৮০ = ৳২,০০০\n• মোট খরচ = ৫০০ + ২০০০ + ১০০ = ৳২,৬০০\n• ১৫% লভ্যাংশ সহ বিক্রয়মূল্য হওয়া উচিত: ৳২,৯৯০।\nকখনোই ১,২০০ বা ১,৫০০ টাকায় বিক্রি করবেন না, এতে আপনার ৫ দিনের নিষ্ঠা অপচয় হবে।'
            : 'For a 5-day Nakshi Kantha (~25 craft hours):\n• Material: ~500 BDT\n• Labor (25h × 80 BDT/h): 2,000 BDT\n• Fair Selling Price: ~2,990 BDT.\nNever sell below 2,500 BDT as that undermines your patient labor.';
        actionLink = {
          label: language === 'bn' ? 'মূল্য ক্যালকুলেটরে হিসাব করুন' : 'Open Price Calculator',
          url: '/seller/pricing-calculator',
        };
      } else if (lower.includes('বিবরণ') || lower.includes('মাটির') || lower.includes('পুতুল') || lower.includes('গহনা') || lower.includes('কাপ')) {
        reply =
          language === 'bn'
            ? 'আপনার পণ্যের খসড়া বিবরণ প্রস্তুত:\n\n"বাংলার প্রাচীন লোকজ ঐতিহ্য এবং মাটির সোঁদা সুবাসকে আধুনিক গৃহকোণে তুলে ধরতে এই সৃষ্টি। সম্পূর্ণ বিষমুক্ত প্রাকৃতিক উপাদান ও কারিগরের নিবিড় হাতের স্পর্শে তৈরি। প্রতিটি অংশের রেখায় রয়েছে আমাদের মেধা ও সময়ের স্বাক্ষর। দৈনন্দিন ব্যবহারের জন্য উপযোগী এবং উপহার হিসেবে অতুলনীয়।"'
            : 'Draft Craft Description:\n\n"Handcrafted with organic materials and centuries-old Bengali craft wisdom. Each curve and texture bears the unique imprint of patient human hands, free from synthetic mass manufacturing. Perfect for heritage lovers and thoughtful gifting."';
        actionLink = {
          label: language === 'bn' ? 'নতুন পণ্য যোগ করার পাতায় যান' : 'Use in Product Upload',
          url: '/seller/products/new',
        };
      } else if (lower.includes('ai ছবি') || lower.includes('নিষিদ্ধ') || lower.includes('ছবি')) {
        reply =
          language === 'bn'
            ? 'কেন AI ছবি নিষিদ্ধ?\n১. AI ছবি কাপড়ের আসল সুতা বা মাটির খাঁটি টেক্সচার নষ্ট করে অতিরিক্ত মসৃণ বা চকচকে করে ফেলে।\n২. ক্রেতা যখন পণ্য হাতে পান তখন ছবির সাথে অমিল দেখে অসন্তুষ্ট হন এবং রিটার্ন করেন।\n৩. আমাদের নীতি: সাধারণ মোবাইল ক্যামেরায় দিনের প্রাকৃতিক আলোয় তোলা আসল ছবিই সবচেয়ে বিশ্বাসযোগ্য ও সুন্দর।'
            : 'Why AI images are strictly barred:\n1. AI filters mask the authentic tactile grain of genuine clay and fabric.\n2. Customers experience mismatch when unboxing, leading to disputes.\n3. Natural daylight phone photos build lasting trust.';
      } else if (lower.includes('প্যাকেজিং') || lower.includes('কুরিয়ার') || lower.includes('ডেলিভারি')) {
        reply =
          language === 'bn'
            ? 'প্যাকেজিং টিপস:\n১. মাটির পণ্যের জন্য বাবল র‍্যাপ বা সুতি কাপড়ের টুকরা ও শক্ত কার্টন ব্যবহার করুন।\n২. কাপড়ের পণ্যের ক্ষেত্রে একটি পলি ও তার ওপর দেশীয় বাদামী পেপার বা পাটের দড়ি দিয়ে বাঁধলে দারুণ নান্দনিক দেখায়।\n৩. ভেতরে একটি ছোট হাতে লেখা ধন্যবাদ চিঠি দিন — ক্রেতারা এটি খুব ভালোবাসেন!'
            : 'Artisanal Packaging Tips:\n1. Use double corrugated boxes and bubble wrap for pottery.\n2. Wrap textiles in kraft paper tied with golden jute string.\n3. Include a handwritten thank-you note from your hands to theirs!';
      } else {
        reply =
          language === 'bn'
            ? `আপনার প্রশ্নের জন্য ধন্যবাদ! হস্তশিল্পে সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো আত্মবিশ্বাস। নিজের হাতের কাজকে কখনো সস্তা ভাববেন না। উপকরণের খরচের পাশাপাশি আপনার সময়কে টাকার অঙ্কে গুণুন। এ সংক্রান্ত যেকোনো হিসাব বা পরামর্শে আমি সব সময় আপনার পাশে আছি।`
            : `Always value your craft hours with pride. Never treat your time as zero-cost. I am here to help you calculate, list, and succeed.`;
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        actionLink,
      };

      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner (No Tagline) */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-terracotta-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-white/20 text-mustard-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-mustard-300" />
            <span>{language === 'bn' ? 'বাংলা-ফার্স্ট এআই সহকারী' : 'Bangla-First AI Business Companion'}</span>
          </div>

          <h1 className="font-bangla text-2xl sm:text-4xl font-bold">
            {language === 'bn' ? 'দামবন্ধু (DaamBondhu) সহকারী — শিল্প বাজার' : 'DaamBondhu AI Assistant — Shilpo Bajar'}
          </h1>

          <p className="text-xs sm:text-sm text-ivory-100 leading-relaxed">
            {language === 'bn'
              ? 'স্বাধীন কারিগর ও গৃহিণীদের পাশে সার্বক্ষণিক সহযোগী। ন্যায্য মূল্য নির্ধারণ, আকর্ষণীয় বিবরণ লেখা ও শপ পরিচালনার সহজ সমাধান।'
              : 'Empowering independent Bangladeshi handmade artisans with fair pricing advice and craft storytelling.'}
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-3xl border border-craft-border shadow-craft overflow-hidden flex flex-col h-[640px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-ivory-50/70">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1 shadow-sm">
                  ব
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm relative group ${
                  msg.sender === 'user'
                    ? 'bg-terracotta-500 text-white rounded-br-none'
                    : 'bg-white text-craft-text border border-craft-border rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>

                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => copyToClipboard(msg.text, msg.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-ivory-100 hover:bg-ivory-200 text-craft-muted opacity-0 group-hover:opacity-100 transition"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-sage-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}

                {msg.actionLink && (
                  <div className="mt-3 pt-2 border-t border-craft-border/60">
                    <button
                      onClick={() => navigate(msg.actionLink!.url)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-600 hover:text-terracotta-700 bg-terracotta-50 py-1.5 px-3 rounded-lg border border-terracotta-200 transition"
                    >
                      <span>{msg.actionLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Categorized Prompt Suggestions */}
        <div className="bg-white p-3 border-t border-craft-border/70 overflow-x-auto">
          <div className="flex gap-2">
            {promptCategories.flatMap(c => c.prompts).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap text-xs bg-ivory-100 hover:bg-terracotta-50 hover:text-terracotta-700 text-craft-text py-1.5 px-3 rounded-full border border-craft-border transition flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-craft-border flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={
              language === 'bn'
                ? 'দামবন্ধু-কে বাংলায় যেকোনো প্রশ্ন করুন (যেমন: আমার পণ্যের দাম কীভাবে ঠিক করব?)...'
                : 'Ask DaamBondhu in Bangla or English...'
            }
            className="flex-1 bg-ivory-100 border border-craft-border rounded-2xl py-3 px-4 text-xs sm:text-sm text-craft-text focus:outline-none focus:ring-2 focus:ring-terracotta-400"
          />
          <button
            onClick={() => handleSend()}
            className="bg-terracotta-500 hover:bg-terracotta-600 text-white p-3 rounded-2xl transition shadow flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
};
