'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Briefcase, Award, GraduationCap, Mail, BookOpen, Settings, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Experience', href: '/admin/experience', icon: Briefcase },
  { name: 'Skills', href: '/admin/skills', icon: Award },
  { name: 'Education', href: '/admin/education', icon: GraduationCap },
  { name: 'Messages', href: '/admin/messages', icon: Mail },
  { name: 'Knowledge', href: '/admin/knowledge', icon: BookOpen },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    // Updated to match public sidebar styling
    <aside className="md:w-72 shrink-0 md:sticky md:top-6 md:h-[calc(100vh-3rem)] modern-card rounded-2xl p-6 overflow-y-auto no-scrollbar">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-[#e8b44c]">YN</span> Admin
        </h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-[#1a150a] text-[#e8b44c] border border-[#3a2f18]' 
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 pt-4 border-t border-[#262626]">
        <Link href="/admin/login" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-[#1a150a] hover:text-[#e8b44c] transition-colors">
          <LogOut size={18} />
          Logout
        </Link>
      </div>
    </aside>
  );
}