'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserExperience() {
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-2">My Experience</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <p className="text-gray-700 leading-relaxed text-lg">{experience || 'No experience content available yet.'}</p>
      </div>
    </div>
  );
}