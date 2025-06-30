'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newExplanation, setNewExplanation] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-content/eyobwende18@gmail.com/projects');
      setProjects(response.data);
      if (response.data.length > 0 && !selectedProject) {
        setSelectedProject(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (selectedProject && selectedProject._id) {
      try {
        await axios.post('http://localhost:5000/api/save-content', {
          type: 'projects',
          content: '',
          email: 'eyobwende18@gmail.com',
          title: selectedProject.title,
          link: selectedProject.link,
          explanation: selectedProject.explanation,
          _id: selectedProject._id,
        });
        fetchProjects();
        alert('Project updated successfully!');
      } catch (error) {
        console.error('Error updating project:', error);
        alert('Failed to update project!');
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/save-content', {
        type: 'projects',
        content: '',
        email: 'eyobwende18@gmail.com',
        title: newTitle,
        link: newLink,
        explanation: newExplanation,
      });
      setNewTitle('');
      setNewLink('');
      setNewExplanation('');
      setShowAddForm(false);
      fetchProjects();
      alert('Project added successfully!');
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project!');
    }
  };

  const handleDelete = async () => {
    if (selectedProject && selectedProject._id) {
      console.log('Delete clicked, project:', selectedProject);
      try {
        const response = await axios.delete(`http://localhost:5000/api/delete-content/eyobwende18@gmail.com/projects/${selectedProject._id}`);
        console.log('Delete response:', response.data);
        if (response.status === 200) {
          setSelectedProject(null);
          fetchProjects();
          alert('Project deleted successfully!');
        } else {
          alert('Failed to delete project: ' + (response.data.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting project:', error.response ? error.response.data : error.message);
        alert('Failed to delete project!');
      }
    } else {
      alert('No project selected for deletion!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Projects</h1>
      {selectedProject && (
        <form onSubmit={handleUpdate} className="space-y-4 mb-6">
          <textarea
            value={selectedProject.title || ''}
            onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="Project Title"
            rows="1"
          />
          <textarea
            value={selectedProject.link || ''}
            onChange={(e) => setSelectedProject({ ...selectedProject, link: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="Project Link or Website Link"
            rows="1"
          />
          <textarea
            value={selectedProject.explanation || ''}
            onChange={(e) => setSelectedProject({ ...selectedProject, explanation: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="Explanation about that project"
            rows="4"
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </form>
      )}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 mb-4"
      >
        {showAddForm ? 'Cancel Add' : 'Add New Project'}
      </button>
      {showAddForm && (
        <form onSubmit={handleAdd} className="space-y-4 mb-6">
          <textarea
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Project Title"
            rows="1"
          />
          <textarea
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Project Link or Website Link"
            rows="1"
          />
          <textarea
            value={newExplanation}
            onChange={(e) => setNewExplanation(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Explanation about that project"
            rows="4"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Add
          </button>
        </form>
      )}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Existing Projects</h2>
        <select
          value={selectedProject?._id || ''}
          onChange={(e) => {
            const project = projects.find(p => p._id === e.target.value);
            setSelectedProject(project);
          }}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select a project to edit</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}