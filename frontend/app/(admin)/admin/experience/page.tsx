'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';

const initialExperience = [
  { id: 1, company: 'YOUR_COMPANY', role: 'YOUR_ROLE', period: '2024 — Present', description: 'Your single experience entry...' },
];

export default function ExperiencePage() {
  const [items, setItems] = useState(initialExperience);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ company: '', role: '', period: '', description: '' });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ company: '', role: '', period: '', description: '' });
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
        <h1 className="text-2xl font-bold text-white">Experience Management</h1>
        <button onClick={handleOpenAdd} className="bg-[#e8b44c] hover:bg-[#d4a345] text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add Experience
        </button>
      </div>

      <DataTable headers={['Role', 'Company', 'Period', 'Actions']}>
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-[#1a1a1a] transition-colors">
            <td className="px-6 py-4 font-medium text-white">{item.role}</td>
            <td className="px-6 py-4">{item.company}</td>
            <td className="px-6 py-4 text-[#e8b44c]">{item.period}</td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <button onClick={() => handleOpenEdit(item)} className="text-gray-400 hover:text-[#e8b44c]"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Experience' : 'Add Experience'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
              <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
              <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Period (e.g., 2024 - Present)</label>
            <input type="text" value={formData.period} onChange={(e) => setFormData({...formData, period: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={4} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
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