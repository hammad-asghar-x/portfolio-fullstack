'use client';

import { useState, useEffect } from 'react';
import { Trash2, Eye } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import { adminFetch } from '@/lib/api';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      // FIXED: Added /contacts segment
      const data = await adminFetch('/api/admin/contacts/messages');
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    try {
      // FIXED: Added /contacts segment
      await adminFetch(`/api/admin/contacts/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m.id !== id));
    } catch (error) {
      console.error('Failed to delete message:', error);
      alert('Failed to delete message');
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      // ADDED: Mark as read functionality
      await adminFetch(`/api/admin/contacts/messages/${id}/read`, { method: 'PUT' });
      // Update local state
      setMessages(messages.map(m => 
        m.id === id ? { ...m, is_read: true } : m
      ));
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="text-gray-400 py-8">Loading messages...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
      </div>

      <DataTable headers={['Name', 'Email', 'Message', 'Date', 'Actions']}>
        {messages.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
              No messages yet.
            </td>
          </tr>
        ) : (
          messages.map((item) => (
            <tr 
              key={item.id} 
              className={`hover:bg-[#1a1a1a] transition-colors cursor-pointer ${!item.is_read ? 'bg-[#1a150a]/20' : ''}`}
              onClick={() => !item.is_read && handleMarkAsRead(item.id)}
            >
              <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                {!item.is_read && <span className="w-2 h-2 rounded-full bg-[#e8b44c]"></span>}
                {item.name}
              </td>
              <td className="px-6 py-4 text-gray-400">{item.email}</td>
              <td className="px-6 py-4 max-w-xs truncate">{item.message}</td>
              <td className="px-6 py-4 text-gray-500 text-xs">{formatDate(item.created_at)}</td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  {!item.is_read && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleMarkAsRead(item.id); }} 
                      className="text-gray-400 hover:text-[#e8b44c] transition-colors"
                      title="Mark as read"
                    >
                      <Eye size={16} />
                    </button>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} 
                    className="text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>
    </div>
  );
}