import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-4 md:p-6 flex flex-col md:flex-row gap-6 min-h-screen bg-[#050505]">
      <AdminSidebar />
      
      {/* Main card matches the public website's main section */}
      <div className="flex-1 modern-card rounded-2xl p-6 md:p-10 min-w-0 flex flex-col">
        <AdminHeader />
        <main className="flex-1 mt-6">
          {children}
        </main>
      </div>
    </div>
  );
}