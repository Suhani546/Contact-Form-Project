import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    try {
      const parsed = storedContacts ? JSON.parse(storedContacts) : [];
      if (Array.isArray(parsed) && parsed.every((c) => c.id)) {
        setContacts(parsed);
      } else {
        localStorage.removeItem('contacts');
      }
    } catch {
      localStorage.removeItem('contacts');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: uuidv4() }]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const editContact = (contact) => {
  setEditingContact(contact);
  setShowForm(true); // <-- ensure form is shown
  };

  const updateContact = (updatedContact) => {
    setContacts(contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c)));
    setEditingContact(null);
  };

  const filteredContacts = contacts.filter((c) =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f2f6ff] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Contact Manager</h1>
          <p className="text-gray-500 mt-1">Manage your contacts efficiently and stay organized</p>
        </header>

        {/* Search + Add Contact */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              setEditingContact(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
            >
           + Add Contact
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard title="Total Contacts" value={contacts.length} icon="👤" />
          <SummaryCard title="Search Results" value={filteredContacts.length} icon="🔍" />
          <SummaryCard title="Recent Contacts" value={contacts.length > 0 ? 1 : 0} icon="➕" />
        </div>

        {/* Contact Form */}
        {showForm && (
        <ContactForm
        key={editingContact?.id || 'new'} // helps reset form
        onSubmit={(contact) => {
        editingContact ? updateContact(contact) : addContact(contact);
        setShowForm(false);
        setEditingContact(null); // <-- reset edit state
        }}
        initialValues={editingContact}
        isEditing={!!editingContact} // <-- pass flag for label change
       />
       )}


        {/* Contact List */}
        <ContactList contacts={filteredContacts} onDelete={deleteContact} onEdit={editContact} />
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon }) => (
  <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between border border-gray-100">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
    </div>
    <div className="text-3xl">{icon}</div>
  </div>
);

export default App;
