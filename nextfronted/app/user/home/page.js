'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [content, setContent] = useState('I am Eyob Wendmagegn and I am learning at Woldia University as a developer');

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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300 mb-6">
        {content}
      </h2>
      <img
        src="/image5.jpg"
        alt="Profile Image"
        className="w-48 h-48 object-cover rounded-full border-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">About Us</h3>
          <p className="text-gray-600">Learn more about our journey and mission.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Services</h3>
          <p className="text-gray-600">Explore the services we offer to our users.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Projects</h3>
          <p className="text-gray-600">Check out our latest completed projects.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact</h3>
          <p className="text-gray-600">Get in touch with us for support.</p>
        </div>
      </div>
    </div>
  );
}