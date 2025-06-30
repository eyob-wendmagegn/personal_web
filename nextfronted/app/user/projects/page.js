'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-content/eyobwende18@gmail.com/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-2 block">
              {project.link}
            </a>
            <p className="text-gray-600">{project.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}