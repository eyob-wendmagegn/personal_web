'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminContact() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-contact/eyobwende18@gmail.com'); // Keep for consistency, but endpoint ignores it
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-9">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-500 pb-2">Contact Messages</h1>
      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-700"><strong>Email:</strong> {msg.email}</p>
              <p className="text-gray-600 mt-2">{msg.message}</p>
              <p className="text-sm text-gray-500 mt-2">Sent: {new Date(msg.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No messages yet.</p>
      )}
    </div>
  );
}