'use client';

import { useState, useEffect } from 'react';
import { FolderKanban, Briefcase, Award, Mail, GraduationCap, MessageSquare, Loader2 } from 'lucide-react';
import { adminFetch } from '@/lib/api';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    skills: 0,
    messages: 0,
    education: 0,
    knowledge: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [projects, experiences, skills, messages, education, knowledge] = await Promise.all([
        adminFetch('/api/admin/projects').catch(() => []),
        adminFetch('/api/admin/experiences').catch(() => []),
        adminFetch('/api/admin/skills').catch(() => []),
        adminFetch('/api/admin/contacts/messages').catch(() => []),
        adminFetch('/api/admin/education').catch(() => []),
        adminFetch('/api/admin/knowledge').catch(() => []),
      ]);

      // Count unread messages
      const unreadMessages = Array.isArray(messages) 
        ? messages.filter((m: any) => !m.is_read).length 
        : 0;

      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        experiences: Array.isArray(experiences) ? experiences.length : 0,
        skills: Array.isArray(skills) ? skills.length : 0,
        messages: unreadMessages,
        education: Array.isArray(education) ? education.length : 0,
        knowledge: Array.isArray(knowledge) ? knowledge.length : 0,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const mainStats = [
    { 
      label: 'Total Projects', 
      value: stats.projects, 
      icon: FolderKanban, 
      color: 'text-[#e8b44c]',
      href: '/admin/projects'
    },
    { 
      label: 'Experience Entries', 
      value: stats.experiences, 
      icon: Briefcase, 
      color: 'text-[#e8b44c]',
      href: '/admin/experience'
    },
    { 
      label: 'Skills', 
      value: stats.skills, 
      icon: Award, 
      color: 'text-[#e8b44c]',
      href: '/admin/skills'
    },
    { 
      label: 'New Messages', 
      value: stats.messages, 
      icon: Mail, 
      color: stats.messages > 0 ? 'text-green-400' : 'text-gray-400',
      href: '/admin/messages',
      badge: stats.messages > 0
    },
  ];

  const secondaryStats = [
    { 
      label: 'Education Entries', 
      value: stats.education, 
      icon: GraduationCap, 
      color: 'text-[#e8b44c]',
      href: '/admin/education'
    },
    { 
      label: 'Knowledge Base', 
      value: stats.knowledge, 
      icon: MessageSquare, 
      color: 'text-[#e8b44c]',
      href: '/admin/knowledge'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#e8b44c]" size={48} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <button 
          onClick={loadDashboardData}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Refresh Data
        </button>
      </div>
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mainStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              className="bg-[#151515] p-6 rounded-xl border border-[#262626] hover:border-[#3a3a3a] transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-[#1a1a1a] ${stat.color}`}>
                  <Icon size={24} />
                </div>
                {stat.badge && (
                  <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                    New
                  </span>
                )}
              </div>
              <h3 className="text-3xl font-bold text-[#e8b44c] mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {secondaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              className="bg-[#151515] p-6 rounded-xl border border-[#262626] hover:border-[#3a3a3a] transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-[#1a1a1a] ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-[#e8b44c] mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Welcome Card */}
      <div className="bg-[#151515] p-6 rounded-xl border border-[#262626]">
        <h2 className="text-xl font-semibold text-white mb-4">Welcome to the Admin Portal</h2>
        <p className="text-gray-400 mb-4">
          Your portfolio content is being managed from here. Use the sidebar to navigate between different sections.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#262626]">
            <h3 className="text-sm font-medium text-[#e8b44c] mb-2">Quick Tip</h3>
            <p className="text-sm text-gray-400">
              Click on any stat card to quickly navigate to that section.
            </p>
          </div>
          <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#262626]">
            <h3 className="text-sm font-medium text-[#e8b44c] mb-2">Messages</h3>
            <p className="text-sm text-gray-400">
              You have <span className="text-white font-semibold">{stats.messages}</span> unread message{stats.messages !== 1 && 's'}
            </p>
          </div>
          <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#262626]">
            <h3 className="text-sm font-medium text-[#e8b44c] mb-2">Content Status</h3>
            <p className="text-sm text-gray-400">
              Total: <span className="text-white font-semibold">{stats.projects + stats.experiences + stats.skills}</span> items
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}