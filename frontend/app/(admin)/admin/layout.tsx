'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Don't block the login page itself
    if (pathname === '/admin/login') {
      setIsLoading(false);
      setIsAuthenticated(true);
      return;
    }

    // 2. Check if token exists in localStorage
    const token = localStorage.getItem('admin_token');
    
    if (!token) {
      // 3. If no token, kick them to login immediately
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, [router, pathname]);

  // Show a quick loading state while checking auth
  if (isLoading) {
    return (
      <div className="w-full p-4 md:p-6 flex flex-col md:flex-row gap-6 min-h-screen bg-[#050505] items-center justify-center">
        <div className="text-[#e8b44c] text-xl font-bold animate-pulse">Checking access...</div>
      </div>
    );
  }

  // If not authenticated, render nothing (the redirect is happening)
  if (!isAuthenticated) {
    return null;
  }

  // 4. If authenticated, show the admin layout
  return (
    <div className="w-full p-4 md:p-6 flex flex-col md:flex-row gap-6 min-h-screen bg-[#050505]">
      <AdminSidebar />
      
      <div className="flex-1 modern-card rounded-2xl p-6 md:p-10 min-w-0 flex flex-col">
        <AdminHeader />
        <main className="flex-1 mt-6">
          {children}
        </main>
      </div>
    </div>
  );
}