'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';

const initialSkills = [
  { id: 1, name: 'TypeScript', category: 'FRONTEND', level: 'Advanced' },
  { id: 2, name: 'FastAPI', category: 'BACKEND', level: 'Intermediate' },
];

export default function SkillsPage() {
  const [items, setItems] = useState(initialSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', category: 'FRONTEND', level: 'Intermediate' });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', category: 'FRONTEND', level: 'Intermediate' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure?')) setItems(items.filter(i => i.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...i, ...formData } : i));
    } else {
      setItems([...items, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Skills Management</h1>
        <button onClick={handleOpenAdd} className="bg-[#e8b44c] hover:bg-[#d4a345] text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add Skill
        </button>
      </div>

      <DataTable headers={['Skill Name', 'Category', 'Level', 'Actions']}>
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-[#1a1a1a] transition-colors">
            <td className="px-6 py-4 font-medium text-white">{item.name}</td>
            <td className="px-6 py-4"><span className="text-xs bg-[#1a150a] text-[#e8b44c] border border-[#3a2f18] px-2 py-1 rounded">{item.category}</span></td>
            <td className="px-6 py-4">{item.level}</td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <button onClick={() => handleOpenEdit(item)} className="text-gray-400 hover:text-[#e8b44c]"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
              </div>
            </td>
          </tr>
        ))}
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
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Level</label>
              <select value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
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