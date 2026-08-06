import { FolderKanban, Briefcase, Award, Mail } from 'lucide-react';

const stats = [
  { label: 'Total Projects', value: '4', icon: FolderKanban, color: 'text-[#e8b44c]' },
  { label: 'Experience Entries', value: '1', icon: Briefcase, color: 'text-[#e8b44c]' },
  { label: 'Skills', value: '10', icon: Award, color: 'text-[#e8b44c]' },
  { label: 'New Messages', value: '2', icon: Mail, color: 'text-[#e8b44c]' },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#151515] p-6 rounded-xl border border-[#262626] hover:border-[#3a3a3a] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <Icon className={stat.color} size={24} />
              </div>
              <h3 className="text-3xl font-bold text-[#e8b44c] mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-[#151515] p-6 rounded-xl border border-[#262626]">
        <h2 className="text-xl font-semibold text-white mb-4">Welcome to the Admin Portal</h2>
        <p className="text-gray-400">
          Use the sidebar to manage your portfolio content. In the next steps, we will connect these pages to your FastAPI backend to add, edit, and delete real data.
        </p>
      </div>
    </div>
  );
}