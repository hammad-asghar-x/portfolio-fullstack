'use client';

import { useState } from 'react';
import { Trash2, Mail } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';

const initialMessages = [
  { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Hello, I love your portfolio!', date: '2024-08-05', is_read: false },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Are you open to freelance work?', date: '2024-08-04', is_read: true },
];

export default function MessagesPage() {
  const [items, setItems] = useState(initialMessages);

  const handleDelete = (id: number) => {
    if (confirm('Delete this message?')) setItems(items.filter(i => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
      </div>

      <DataTable headers={['Name', 'Email', 'Message', 'Date', 'Actions']}>
        {items.map((item) => (
          <tr key={item.id} className={`hover:bg-[#1a1a1a] transition-colors ${!item.is_read ? 'bg-[#1a150a]/20' : ''}`}>
            <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
              {!item.is_read && <span className="w-2 h-2 rounded-full bg-[#e8b44c]"></span>}
              {item.name}
            </td>
            <td className="px-6 py-4 text-gray-400">{item.email}</td>
            <td className="px-6 py-4 max-w-xs truncate">{item.message}</td>
            <td className="px-6 py-4 text-gray-500 text-xs">{item.date}</td>
            <td className="px-6 py-4">
              <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}