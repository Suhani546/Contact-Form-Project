import React from 'react';
import { Trash2, Pencil } from 'lucide-react';

const ContactList = ({ contacts = [], onDelete, onEdit }) => {
  if (!contacts || contacts.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        <div className="text-5xl mb-2">👤</div>
        <p className="text-lg font-semibold">No contacts found</p>
        <p className="text-sm">Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {contacts.map((contact) => (
        <div key={contact.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">
                {contact.firstName} {contact.lastName}
              </h3>
              <span className="text-sm text-gray-500">Contact</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit && onEdit(contact)}
                className="text-blue-600 hover:scale-110 transition"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => onDelete && onDelete(contact.id)}
                className="text-red-500 hover:scale-110 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            <p>📧 {contact.email || 'Not provided'}</p>
            <p>📞 {contact.phone || 'Not provided'}</p>
            <p>📍 {contact.address || 'Not provided'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
