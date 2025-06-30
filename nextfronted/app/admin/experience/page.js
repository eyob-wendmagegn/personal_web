'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminExperience() {
  const [experience, setExperience] = useState('');

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-content/eyobwende18@gmail.com/experience');
      if (response.data.length > 0) {
        setExperience(response.data[0].content || '');
      }
    } catch (error) {
      console.error('Error fetching experience:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/save-content', {
        type: 'experience',
        content: experience,
        email: 'eyobwende18@gmail.com',
      });
      fetchExperience();
      alert('Experience updated successfully!');
    } catch (error) {
      console.error('Error updating experience:', error);
      alert('Failed to update experience!');
    }
  };

  return (
    <div className="p-6"> {/* Removed mt-48, relying on main's marginTop */}
      <h1 className="text-3xl font-bold mb-4">Admin Experience</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full p-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[200px]"
          placeholder="Write your experience here..."
          rows="6"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
}