'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import Sidebar from '@/components/public/Sidebar';
import Navigation from '@/components/public/Navigation';
import AboutSection from '@/components/public/AboutSection';
import ReviewsSection from '@/components/public/ReviewsSection';
import ResumeSection from '@/components/public/ResumeSection';
import PortfolioSection from '@/components/public/PortfolioSection';
import ProjectModal from '@/components/public/ProjectModal';
import ContactSection from '@/components/public/ContactSection';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

// Define types based on your backend models
interface Project {
  id: number; title: string; slug: string; short_description: string; long_description: string;
  image_url: string | null; github_url: string | null; live_url: string | null;
  technologies: string | string[]; featured: boolean; is_published: boolean;
}
interface Skill { id: number; name: string; category: string; level: string; }
interface Experience { id: number; company: string; role: string; period: string; description: string; }
interface Education { id: number; institution: string; degree: string; period: string; description: string; }

export default function Home() {
  const [activeTab, setActiveTab] = useState('about');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProjectIndex, setModalProjectIndex] = useState(0);
  
  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all public data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all endpoints in parallel
        const [projRes, skillRes, expRes, eduRes] = await Promise.all([
          fetchAPI('/api/projects'),
          fetchAPI('/api/skills'),
          fetchAPI('/api/experiences'),
          fetchAPI('/api/education'),
        ]);

        // The backend returns arrays directly
        setProjects(projRes || []);
        setSkills(skillRes || []);
        setExperience(expRes || []);
        setEducation(eduRes || []);
      } catch (error) {
        console.error("Failed to load portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  if (loading) {
    return (
      <div className="w-full flex flex-col md:flex-row min-h-screen bg-[#050505] items-center justify-center text-[#e8b44c]">
        <div className="text-xl font-bold animate-pulse">Loading Portfolio...</div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6 flex flex-col md:flex-row gap-6 min-h-screen bg-[#050505]">
      <Sidebar />
      
      <main className="flex-1 modern-card rounded-2xl p-6 md:p-10 min-w-0 overflow-y-auto">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'about' && (
          <>
            <AboutSection />
            <ReviewsSection />
          </>
        )}
        
        {activeTab === 'resume' && (
          <ResumeSection skills={skills} experience={experience} education={education} />
        )}
        
        {activeTab === 'portfolio' && (
          <PortfolioSection projects={projects} onOpenModal={openModal} />
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