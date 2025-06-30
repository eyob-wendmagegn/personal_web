'use client';

import { useState } from 'react';
import axios from 'axios';

export default function UserContact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/save-contact', {
        email,
        message,
      });
      setEmail('');
      setMessage('');
      setStatus('Message sent successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Failed to send message. Please try again.');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-500 pb-2">Contact Me</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-y min-h-[150px]"
            placeholder="Write your message here..."
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Send
        </button>
        {status && <p className="mt-2 text-center text-sm font-medium text-green-600">{status}</p>}
      </form>
    </div>
  );
}