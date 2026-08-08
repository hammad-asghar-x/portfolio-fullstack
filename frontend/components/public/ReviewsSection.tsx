'use client';
import { useState, useEffect } from 'react';
import Icon from '../ui/Icon';

const reviews = [
  { 
    t: "Hammad built our custom e-commerce dashboard from scratch. His React integration was seamless, and he handled the FastAPI backend perfectly. Delivered ahead of schedule.", 
    n: "Ahmed Raza", 
    r: "E-commerce Entrepreneur" 
  },
  { 
    t: "We needed a fast, responsive landing page for our educational platform. Hammad optimized our Core Web Vitals and the site now loads instantly on mobile. Highly recommended.", 
    n: "Ayesha Khan", 
    r: "EdTech Founder" 
  },
  { 
    t: "Hammad integrated our payment gateway APIs and built a secure admin portal for our team. His code is clean, well-documented, and he communicates very professionally.", 
    n: "Bilal Ahmed", 
    r: "Startup Founder" 
  },
];

export default function ReviewsSection() {
  const [revIndex, setRevIndex] = useState(0);
  const [revAnimating, setRevAnimating] = useState(false);
  const currentReview = reviews[revIndex];

  const handleRevNext = (d: number) => {
    if (revAnimating) return;
    setRevAnimating(true);
    setTimeout(() => {
      setRevIndex((prev) => (prev + d + reviews.length) % reviews.length);
      setRevAnimating(false);
    }, 300);
  };

  const handleRevGo = (i: number) => {
    if (i === revIndex) return;
    setRevAnimating(true);
    setTimeout(() => {
      setRevIndex(i);
      setRevAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => handleRevNext(1), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold mt-10 tracking-tight">Reviews</h2>
      <div className={`bg-[#151515] border border-[#262626] rounded-2xl p-6 mt-5 transition-all duration-300 ${revAnimating ? 'opacity-0 -translate-x-[70px]' : 'opacity-100 translate-x-0'}`}>
        <div className="flex justify-between items-center">
          <span className="text-3xl gold font-serif">"</span>
          <span className="flex gap-1 gold">{[...Array(5)].map((_, i) => <Icon key={i} id="star" />)}</span>
        </div>
        <p className="text-[#a3a3a3] mt-3 leading-relaxed font-light">"{currentReview.t}"</p>
        <div className="border-t border-[#262626] mt-5 pt-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#262626] grid place-items-center gold text-sm font-bold shrink-0">
            {currentReview.n.split(' ').map(w => w[0]).join('')}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold">{currentReview.n}</div>
            <div className="text-xs text-gray-500">{currentReview.r}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-4">
        <div className="flex gap-1.5 mr-auto">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => handleRevGo(i)} className={`w-2 h-2 rounded-full transition-colors ${i === revIndex ? 'bg-gold' : 'bg-[#262626]'}`} />
          ))}
        </div>
        <button onClick={() => handleRevNext(-1)} className="w-9 h-9 rounded-full bg-[#151515] border border-[#262626] grid place-items-center gold hover:border-[#E8B44C] transition-colors">
          <Icon id="left" />
        </button>
        <button onClick={() => handleRevNext(1)} className="w-9 h-9 rounded-full bg-[#151515] border border-[#262626] grid place-items-center gold hover:border-[#E8B44C] transition-colors">
          <Icon id="right" />
        </button>
      </div>
    </>
  );
}