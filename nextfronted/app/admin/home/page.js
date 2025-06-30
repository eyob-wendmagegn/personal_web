'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminHome() {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-content/eyobwende18@gmail.com/home');
        if (response.data.length > 0) {
          setContent(response.data[0].content);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    fetchContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/save-content', {
        type: 'home',
        content,
        email: 'eyobwende18@gmail.com'
      });
      // Re-fetch content to reflect the update
      const response = await axios.get('http://localhost:5000/api/get-content/eyobwende18@gmail.com/home');
      if (response.data.length > 0) {
        setContent(response.data[0].content);
      }
      alert('Content updated successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to update content!');
    }
  };

  return (
    <div className="p-6 top-8">
      <h1 className="text-3xl font-bold mb-4">Admin Home</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter home page content"
          rows="4"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}