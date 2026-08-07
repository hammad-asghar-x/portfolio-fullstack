'use client';
import { useState } from 'react';
import Icon from '../ui/Icon';
import { postAPI } from '@/lib/api';

export default function ContactSection() {
  const [messageSent, setMessageSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setMessageSent(false);

    try {
      await postAPI('/api/contact', formData);
      setMessageSent(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      // FIX: Properly extract error message
      console.error('Contact form error:', err);
      const errorMessage = err.message || String(err) || 'Failed to send message';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
          <input 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
            placeholder="Full name" 
            className="bg-transparent border-b border-[#262626] focus:border-[#E8B44C] py-2.5 text-sm placeholder-gray-500 transition-colors w-full" 
          />
          <input 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            type="email" 
            placeholder="Email address" 
            className="bg-transparent border-b border-[#262626] focus:border-[#E8B44C] py-2.5 text-sm placeholder-gray-500 transition-colors w-full" 
          />
        </div>
        <textarea 
          name="message" 
          value={formData.message}
          onChange={handleChange}
          required 
          placeholder="Your Message" 
          rows={5} 
          className="w-full bg-transparent border-b border-[#262626] focus:border-[#E8B44C] py-2.5 text-sm placeholder-gray-500 mt-6 resize-y transition-colors"
        ></textarea>
        
        <div className="flex flex-wrap items-center justify-end gap-4 mt-6">
          {error && <span className="text-sm text-red-400">{error}</span>}
          {messageSent && <span className="text-sm text-green-400">Message sent ✓</span>}
          <button 
            disabled={isSubmitting}
            className="bg-[#151515] border border-[#262626] rounded-lg px-5 py-2.5 text-sm gold flex items-center gap-2 hover:border-[#E8B44C] hover:bg-[#1a150a] transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : <><Icon id="send" /> Send Message</>}
          </button>
        </div>
      </form>
    </section>
  );
}