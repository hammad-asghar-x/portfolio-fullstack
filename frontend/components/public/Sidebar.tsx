'use client';
import { useState, useEffect } from 'react';
import Icon from '../ui/Icon';

export default function Sidebar() {
  const [twText, setTwText] = useState('');
  const titles = ["Web developer", "UI engineer", "Freelancer"];

  useEffect(() => {
    let tI = 0, cI = 0, del = false;
    const interval = setInterval(() => {
      const t = titles[tI];
      cI += del ? -1 : 1;
      setTwText(t.slice(0, cI));
      if (!del && cI === t.length) del = true;
      if (del && cI === 0) {
        del = false;
        tI = (tI + 1) % titles.length;
      }
    }, del ? 60 : 140);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="md:w-72 shrink-0 md:sticky md:top-6 md:h-[calc(100vh-3rem)] modern-card rounded-2xl p-6 overflow-y-auto no-scrollbar">
      <div className="w-36 h-36 mx-auto rounded-2xl bg-[#1a1a1a] border border-[#262626] grid place-items-center text-4xl gold font-bold shadow-lg">YN</div>
      <h2 className="text-center text-xl font-bold mt-4 tracking-tight">YOUR_NAME</h2>
      <div className="text-center mt-3">
        <span className="text-xs bg-[#151515] border border-[#262626] rounded-md px-3 py-1.5 text-gray-300">
          <span>{twText}</span><span className="gold">|</span>
        </span>
      </div>
      <div className="text-center mt-2">
        <span className="text-xs gold bg-[#1a150a] border border-[#3a2f18] rounded-md px-3 py-1.5 shadow-[0_0_10px_rgba(232,180,76,0.2)]">● Open to work</span>
      </div>
      <div className="border-t border-[#262626] my-5"></div>
      
      <div className="space-y-4 text-sm">
        {[
          { icon: 'mail', label: 'EMAIL', value: 'YOUR_EMAIL' },
          { icon: 'phone', label: 'PHONE', value: 'YOUR_PHONE' },
          { icon: 'cal', label: 'BIRTHDAY', value: 'YOUR_BIRTHDAY' },
          { icon: 'pin', label: 'LOCATION', value: 'YOUR_LOCATION' },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-md bg-[#151515] border border-[#262626] grid place-items-center gold shrink-0">
              <Icon id={item.icon} />
            </span>
            <div className="min-w-0">
              <div className="text-[10px] tracking-widest text-gray-500 font-semibold">{item.label}</div>
              <div className="text-gray-200 truncate">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-5 text-gray-400 text-xs font-bold">
        <a className="hover:text-white transition-colors" href="#">GitHub</a>
        <a className="hover:text-white transition-colors" href="#">LinkedIn</a>
        <a className="hover:text-white transition-colors" href="#">X</a>
      </div>
      <button className="w-full mt-5 bg-[#151515] border border-[#262626] rounded-lg py-2.5 text-sm gold flex items-center justify-center gap-2 hover:border-[#E8B44C] hover:bg-[#1a150a] transition-all">
        <Icon id="dl" /> Download CV
      </button>
    </aside>
  );
}