'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import { adminFetch } from '@/lib/api';

interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
  is_published: boolean;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '', category: 'FRONTEND', level: 'Intermediate', is_published: true
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);
      const data = await adminFetch('/api/admin/skills');
      setSkills(data || []);
    } catch (error) {
      console.error("Failed to load skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', category: 'FRONTEND', level: 'Intermediate', is_published: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Skill) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      level: item.level,
      is_published: item.is_published
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await adminFetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      loadSkills();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await adminFetch(`/api/admin/skills/${editingItem.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await adminFetch('/api/admin/skills', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      loadSkills();
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    }
  };

  if (loading) return <div className="text-gray-400 py-8">Loading skills...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Skills Management</h1>
        <button onClick={handleOpenAdd} className="bg-[#e8b44c] hover:bg-[#d4a345] text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add Skill
        </button>
      </div>

      <DataTable headers={['Skill Name', 'Category', 'Level', 'Status', 'Actions']}>
        {skills.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
              No skills found.
            </td>
          </tr>
        ) : (
          skills.map((item) => (
            <tr key={item.id} className="hover:bg-[#1a1a1a] transition-colors">
              <td className="px-6 py-4 font-medium text-white">{item.name}</td>
              <td className="px-6 py-4"><span className="text-xs bg-[#1a150a] text-[#e8b44c] border border-[#3a2f18] px-2 py-1 rounded">{item.category}</span></td>
              <td className="px-6 py-4">{item.level}</td>
              <td className="px-6 py-4">
                <span className={`text-xs px-2 py-1 rounded border ${item.is_published ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                  {item.is_published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button onClick={() => handleOpenEdit(item)} className="text-gray-400 hover:text-[#e8b44c]"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Skill' : 'Add Skill'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Skill Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none">
                <option>FRONTEND</option>
                <option>BACKEND</option>
                <option>WORKFLOW</option>
                <option>AI/ML</option>
                <option>OTHER</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Level</label>
              <select value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({...formData, is_published: e.target.checked})} className="accent-[#e8b44c]" />
            <label className="text-sm text-gray-300 cursor-pointer">Published</label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
            <button type="submit" className="bg-[#e8b44c] hover:bg-[#d4a345] text-black font-bold py-2 px-6 rounded-lg transition-colors">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}