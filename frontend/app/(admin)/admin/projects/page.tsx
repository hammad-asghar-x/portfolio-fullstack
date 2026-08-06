'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Github } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';

// Mock Data (Matches the public website)
const initialProjects = [
  { id: 1, title: 'Pulseboard', tech: 'React, Node.js', featured: true, published: true },
  { id: 2, title: 'Northline', tech: 'Next.js, Sanity', featured: false, published: true },
  { id: 3, title: 'Forcelly', tech: 'React, FastAPI', featured: true, published: false },
  { id: 4, title: 'Stocknote', tech: 'TypeScript, Docker', featured: false, published: true },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({ title: '', tech: '', featured: false, published: true });

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({ title: '', tech: '', featured: false, published: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setEditingProject(project);
    setFormData({ title: project.title, tech: project.tech, featured: project.featured, published: project.published });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...formData } : p));
    } else {
      setProjects([...projects, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Projects Management</h1>
        <button 
          onClick={handleOpenAdd}
          className="bg-[#e8b44c] hover:bg-[#d4a345] text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      <DataTable headers={['Title', 'Technologies', 'Status', 'Actions']}>
        {projects.map((project) => (
          <tr key={project.id} className="hover:bg-[#1a1a1a] transition-colors">
            <td className="px-6 py-4 font-medium text-white">{project.title}</td>
            <td className="px-6 py-4">{project.tech}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                {project.featured && <span className="text-xs bg-[#1a150a] text-[#e8b44c] border border-[#3a2f18] px-2 py-1 rounded">Featured</span>}
                <span className={`text-xs px-2 py-1 rounded border ${project.published ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                  {project.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <button onClick={() => handleOpenEdit(project)} className="text-gray-400 hover:text-[#e8b44c] transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProject ? 'Edit Project' : 'Add New Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Project Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Technologies (comma separated)</label>
            <input 
              type="text" 
              value={formData.tech}
              onChange={(e) => setFormData({...formData, tech: e.target.value})}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none"
              required
            />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="accent-[#e8b44c]" 
              />
              Featured Project
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.published}
                onChange={(e) => setFormData({...formData, published: e.target.checked})}
                className="accent-[#e8b44c]" 
              />
              Published
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" className="bg-[#e8b44c] hover:bg-[#d4a345] text-black font-bold py-2 px-6 rounded-lg transition-colors">
              {editingProject ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}