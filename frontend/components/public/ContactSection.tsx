'use client';
import { useState } from 'react';
import Icon from '../ui/Icon';

export default function ContactSection() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageSent(true);
    e.currentTarget.reset();
  };

  return (
    <section className="mt-8">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <div className="w-10 h-1 bg-gold mt-3 rounded-full"></div>
      <div className="relative mt-8 rounded-xl overflow-hidden border border-[#262626] h-64 bg-[#1a222b] grid place-items-center text-gray-500 text-sm text-center px-4">
        🗺 Map — OpenStreetMap lazy iframe in real build
        <span className="absolute top-3 left-3 text-xs bg-white text-blue-700 rounded px-2 py-1 flex items-center gap-1 font-medium">
          Open in Maps <Icon id="ext" />
        </span>
      </div>
      <h2 className="font-bold mt-8 tracking-tight">Contact Form</h2>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <input required placeholder="Full name" className="bg-transparent border-b border-[#262626] focus:border-[#E8B44C] py-2.5 text-sm placeholder-gray-500 transition-colors w-full" />
          <input required type="email" placeholder="Email address" className="bg-transparent border-b border-[#262626] focus:border-[#E8B44C] py-2.5 text-sm placeholder-gray-500 transition-colors w-full" />
        </div>
        <textarea required placeholder="Your Message" rows={5} className="w-full bg-transparent border-b border-[#262626] focus:border-[#E8B44C] py-2.5 text-sm placeholder-gray-500 mt-6 resize-y transition-colors"></textarea>
        <div className="flex flex-wrap items-center justify-end gap-4 mt-6">
          {messageSent && <span className="text-sm gold">Message sent ✓</span>}
          <button className="bg-[#151515] border border-[#262626] rounded-lg px-5 py-2.5 text-sm gold flex items-center gap-2 hover:border-[#E8B44C] hover:bg-[#1a150a] transition-all">
            <Icon id="send" /> Send Message
          </button>
        </div>
      </form>
    </section>
  );
}