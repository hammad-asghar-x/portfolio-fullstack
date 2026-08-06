'use client';

import { useState } from 'react';
import Sidebar from '@/components/public/Sidebar';
import Navigation from '@/components/public/Navigation';
import AboutSection from '@/components/public/AboutSection';
import ReviewsSection from '@/components/public/ReviewsSection';
import ResumeSection from '@/components/public/ResumeSection';
import PortfolioSection from '@/components/public/PortfolioSection';
import ProjectModal from '@/components/public/ProjectModal';
import ContactSection from '@/components/public/ContactSection';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

const projects = [
  { t: "Pulseboard", s: "Analytics dashboard for SaaS teams", l: "Analytics dashboard with live charts, saved views and role-based access. Built as a responsive React app with a Node API.", tech: ["React", "TypeScript", "Node.js", "PostgreSQL"], c: "from-[#123a4a] to-[#0b1c26]" },
  { t: "Northline", s: "Marketing site with CMS", l: "Dark-themed marketing site with headless CMS, SEO tooling and 99 Lighthouse performance.", tech: ["Next.js", "Tailwind", "Sanity"], c: "from-[#3a2f18] to-[#191919]" },
  { t: "Forcelly", s: "Mobile-first fitness app", l: "Progressive web app for workout tracking with offline support and push reminders.", tech: ["React", "PWA", "FastAPI"], c: "from-[#1f3a2a] to-[#0b261a]" },
  { t: "Stocknote", s: "Inventory tool for small shops", l: "Inventory and notes tool with barcode scanning and daily reports by email.", tech: ["TypeScript", "PostgreSQL", "Docker"], c: "from-[#3a1f2e] to-[#260b1c]" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('about');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProjectIndex, setModalProjectIndex] = useState(0);

  const openModal = (i: number) => {
    setModalProjectIndex(i);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  const navModal = (d: number) => {
    setModalProjectIndex((prev) => (prev + d + projects.length) % projects.length);
  };

  return (
    <div className="w-full p-4 md:p-6 flex flex-col md:flex-row gap-6 min-h-screen bg-[#050505]">      <Sidebar />
      
      <main className="flex-1 modern-card rounded-2xl p-6 md:p-10 min-w-0 overflow-y-auto">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'about' && (
          <>
            <AboutSection />
            <ReviewsSection />
          </>
        )}
        
        {activeTab === 'resume' && <ResumeSection />}
        
        {activeTab === 'portfolio' && (
          <PortfolioSection onOpenModal={openModal} />
        )}
        
        {activeTab === 'contact' && <ContactSection />}
      </main>

      <ProjectModal 
        isOpen={modalOpen} 
        project={projects[modalProjectIndex]} 
        onClose={closeModal} 
        onNav={navModal} 
      />
      
      <ChatbotWidget />
    </div>
  );
}