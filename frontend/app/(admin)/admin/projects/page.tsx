'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import { adminFetch } from '@/lib/api';

interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  technologies: string;
  featured: boolean;
  is_published: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '', slug: '', short_description: '', long_description: '',
    technologies: '', featured: false, is_published: true
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await adminFetch('/api/admin/projects');
      setProjects(data || []);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({ title: '', slug: '', short_description: '', long_description: '', technologies: '', featured: false, is_published: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      short_description: project.short_description,
      long_description: project.long_description,
      technologies: project.technologies,
      featured: project.featured,
      is_published: project.is_published
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await adminFetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      loadProjects();
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await adminFetch(`/api/admin/projects/${editingProject.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await adminFetch('/api/admin/projects', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      loadProjects();
    } catch (error: any) {
      alert(error.message || 'Failed to save project');
    }
  };

  if (loading) return <div className="text-gray-400 py-8">Loading projects...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Projects Management</h1>
        <button onClick={handleOpenAdd} className="bg-[#e8b44c] hover:bg-[#d4a345] text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add Project
        </button>
      </div>

      <DataTable headers={['Title', 'Technologies', 'Status', 'Actions']}>
        {projects.length === 0 ? (
          <tr>
            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
              No projects found. Click "Add Project" to create one.
            </td>
          </tr>
        ) : (
          projects.map((project) => (
            <tr key={project.id} className="hover:bg-[#1a1a1a] transition-colors">
              <td className="px-6 py-4 font-medium text-white">{project.title}</td>
              <td className="px-6 py-4 text-sm text-gray-400">{project.technologies}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  {project.featured && <span className="text-xs bg-[#1a150a] text-[#e8b44c] border border-[#3a2f18] px-2 py-1 rounded">Featured</span>}
                  <span className={`text-xs px-2 py-1 rounded border ${project.is_published ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                    {project.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button onClick={() => handleOpenEdit(project)} className="text-gray-400 hover:text-[#e8b44c] transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(project.id)} className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProject ? 'Edit Project' : 'Add New Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Slug (e.g., my-project)</label>
              <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Short Description</label>
            <input type="text" value={formData.short_description} onChange={(e) => setFormData({...formData, short_description: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Long Description</label>
            <textarea value={formData.long_description} onChange={(e) => setFormData({...formData, long_description: e.target.value})} rows={4} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Technologies (comma separated)</label>
            <input type="text" value={formData.technologies} onChange={(e) => setFormData({...formData, technologies: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="accent-[#e8b44c]" /> Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({...formData, is_published: e.target.checked})} className="accent-[#e8b44c]" /> Published
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
            <button type="submit" className="bg-[#e8b44c] hover:bg-[#d4a345] text-black font-bold py-2 px-6 rounded-lg transition-colors">Save Project</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}