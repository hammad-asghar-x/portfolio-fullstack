'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login for UI testing
    if (username === 'admin' && password === 'admin123') {
      router.push('/admin/dashboard');
    } else {
      alert('Invalid credentials. Try admin / admin123');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md bg-[#151515] p-8 rounded-xl border border-[#262626] shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 pl-10 pr-4 text-white focus:border-[#e8b44c] focus:outline-none transition-colors"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 pl-10 pr-4 text-white focus:border-[#e8b44c] focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#e8b44c] hover:bg-[#d4a345] text-black font-bold py-2 rounded-lg transition-colors mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}