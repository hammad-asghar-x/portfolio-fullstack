'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, BookOpen } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import { adminFetch } from '@/lib/api';

interface Knowledge {
  id: number;
  title: string;
  content: string;
  category: string;
  is_published: boolean;
}

export default function KnowledgePage() {
  const [knowledge, setKnowledge] = useState<Knowledge[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Knowledge | null>(null);
  const [loading, setLoading] = useState(true);
  const [reindexing, setReindexing] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', content: '', category: 'General', is_published: true
  });

  useEffect(() => {
    loadKnowledge();
  }, []);

  const loadKnowledge = async () => {
    try {
      setLoading(true);
      const data = await adminFetch('/api/admin/knowledge');
      setKnowledge(data || []);
    } catch (error) {
      console.error("Failed to load knowledge:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', content: '', category: 'General', is_published: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Knowledge) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      is_published: item.is_published
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this knowledge entry?')) return;
    try {
      await adminFetch(`/api/admin/knowledge/${id}`, { method: 'DELETE' });
      loadKnowledge();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await adminFetch(`/api/admin/knowledge/${editingItem.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await adminFetch('/api/admin/knowledge', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      loadKnowledge();
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    }
  };

  const handleReindex = async () => {
    if (!confirm('This will rebuild the chatbot vector database. Continue?')) return;
    try {
      setReindexing(true);
      await adminFetch('/api/admin/knowledge/reindex', { method: 'POST' });
      alert('Vector database reindexed successfully! The chatbot now knows about your latest updates.');
    } catch (error: any) {
      alert(error.message || 'Failed to reindex vector database');
    } finally {
      setReindexing(false);
    }
  };

  if (loading) return <div className="text-gray-400 py-8">Loading knowledge...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Chatbot Knowledge Base</h1>
        <div className="flex gap-3">
          <button 
            onClick={handleReindex} 
            disabled={reindexing}
            className="bg-[#1a1a1a] hover:bg-[#262626] text-[#e8b44c] border border-[#3a2f18] font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={reindexing ? "animate-spin" : ""} /> 
            {reindexing ? 'Reindexing...' : 'Reindex Vector DB'}
          </button>
          <button onClick={handleOpenAdd} className="bg-[#e8b44c] hover:bg-[#d4a345] text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={18} /> Add Knowledge
          </button>
        </div>
      </div>

      <div className="bg-[#1a150a]/20 border border-[#3a2f18] rounded-lg p-4 mb-6 flex items-start gap-3">
        <BookOpen className="text-[#e8b44c] shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-gray-300">
          This data is used by the AI Chatbot to answer questions about you. 
          After adding or editing knowledge, click <strong>"Reindex Vector DB"</strong> to update the chatbot's brain.
        </p>
      </div>

      <DataTable headers={['Title', 'Category', 'Status', 'Actions']}>
        {knowledge.length === 0 ? (
          <tr>
            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
              No knowledge entries found. Add some information for the chatbot to learn!
            </td>
          </tr>
        ) : (
          knowledge.map((item) => (
            <tr key={item.id} className="hover:bg-[#1a1a1a] transition-colors">
              <td className="px-6 py-4 font-medium text-white">
                {item.title}
                <span className="block text-xs text-gray-500 font-normal truncate max-w-xs mt-1">
                  {item.content}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs bg-[#1a150a] text-[#e8b44c] border border-[#3a2f18] px-2 py-1 rounded">
                  {item.category}
                </span>
              </td>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Knowledge' : 'Add Knowledge'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title / Question</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., What is your name?" className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none">
              <option>General</option>
              <option>Skills</option>
              <option>Projects</option>
              <option>Education</option>
              <option>Experience</option>
              <option>Contact</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Content / Answer</label>
            <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={6} placeholder="e.g., My name is YOUR_NAME. I am a Full Stack Developer..." className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-4 text-white focus:border-[#e8b44c] focus:outline-none" required />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({...formData, is_published: e.target.checked})} className="accent-[#e8b44c]" />
            <label className="text-sm text-gray-300 cursor-pointer">Published (Available to Chatbot)</label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
            <button type="submit" className="bg-[#e8b44c] hover:bg-[#d4a345] text-black font-bold py-2 px-6 rounded-lg transition-colors">Save Knowledge</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}