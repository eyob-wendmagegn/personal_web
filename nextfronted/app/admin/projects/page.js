'use client';

import { useTheme } from '../../../context/ThemeContext';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AdminProjects() {
  const { language, isDarkMode } = useTheme(); // Access language and mode
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newExplanation, setNewExplanation] = useState('');

  useEffect(() => {
    fetchProjects();
  }, [language]); // Re-fetch or re-translate when language changes

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-content/eyobwende18@gmail.com/projects');
      if (response.data.length > 0) {
        const translatedProjects = response.data.map(project => ({
          ...project,
          title: translateContent(project.title),
          link: translateContent(project.link),
          explanation: translateContent(project.explanation),
        }));
        setProjects(translatedProjects);
        if (!selectedProject) {
          setSelectedProject(translatedProjects[0]);
        } else {
          const updatedSelected = translatedProjects.find(p => p._id === selectedProject._id);
          setSelectedProject(updatedSelected || translatedProjects[0]);
        }
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
          title: translateContent(selectedProject.title, true), // Save original if reverse translation needed
          link: translateContent(selectedProject.link, true),
          explanation: translateContent(selectedProject.explanation, true),
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
        title: translateContent(newTitle, true),
        link: translateContent(newLink, true),
        explanation: translateContent(newExplanation, true),
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
      try {
        const response = await axios.delete(`http://localhost:5000/api/delete-content/eyobwende18@gmail.com/projects/${selectedProject._id}`);
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

  // Translation function for project data
  const translateContent = (text, reverse = false) => {
    const translations = {
      en: {
        'project one': 'ፕሮጀክት አንድ',
        'project two': 'ፕሮጀክት ሁለት',
        'https://example.com/project1': 'https://example.com/project1', // Example link, adjust as needed
        'this is project one': 'ይህ ፕሮጀክት አንድ ነው',
      },
      am: {
        'ፕሮጀክት አንድ': 'project one',
        'ፕሮጀክት ሁለት': 'project two',
        'https://example.com/project1': 'https://example.com/project1',
        'ይህ ፕሮጀክት አንድ ነው': 'this is project one',
      },
    };
    const normalizedText = text ? text.trim().toLowerCase() : text;
    const langTranslations = reverse ? translations[language === 'am' ? 'en' : 'am'] : translations[language] || translations.en;
    for (const [key, value] of Object.entries(langTranslations)) {
      if (normalizedText === key.toLowerCase()) {
        return value;
      }
    }
    return text || ''; // Fallback to original text or empty if no match
  };

  // Translation for static UI elements
  const translations = {
    en: {
      title: 'Admin Projects',
      selectPlaceholder: 'Select a project to edit',
      projectTitle: 'Project Title',
      projectLink: 'Project Link or Website Link',
      projectExplanation: 'Explanation about that project',
      update: 'Update',
      delete: 'Delete',
      addNew: 'Add New Project',
      cancelAdd: 'Cancel Add',
      add: 'Add',
    },
    am: {
      title: 'የአስተዳደር ፕሮጀክቶች',
      selectPlaceholder: 'ለማስተካከል ፕሮጀክት ይምረጡ',
      projectTitle: 'የፕሮጀክት ርዕስ',
      projectLink: 'የፕሮጀክት አገናኝ ወይም ድህረ ገፅ አገናኝ',
      projectExplanation: 'ስለዚህ ፕሮጀክት መግለጫ',
      update: 'ዝውውር',
      delete: 'መሰረዝ',
      addNew: 'አዲስ ፕሮጀክት ያክሉ',
      cancelAdd: 'መጨመር ሁለንተርፍ',
      add: 'አክል',
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
      {selectedProject && (
        <form onSubmit={handleUpdate} className="space-y-4 mb-6">
          <textarea
            value={selectedProject.title || ''}
            onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })}
            className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={t.projectTitle}
            rows="1"
          />
          <textarea
            value={selectedProject.link || ''}
            onChange={(e) => setSelectedProject({ ...selectedProject, link: e.target.value })}
            className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={t.projectLink}
            rows="1"
          />
          <textarea
            value={selectedProject.explanation || ''}
            onChange={(e) => setSelectedProject({ ...selectedProject, explanation: e.target.value })}
            className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={t.projectExplanation}
            rows="4"
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              {t.update}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            >
              {t.delete}
            </button>
          </div>
        </form>
      )}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 mb-4"
      >
        {showAddForm ? t.cancelAdd : t.addNew}
      </button>
      {showAddForm && (
        <form onSubmit={handleAdd} className="space-y-4 mb-6">
          <textarea
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={t.projectTitle}
            rows="1"
          />
          <textarea
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={t.projectLink}
            rows="1"
          />
          <textarea
            value={newExplanation}
            onChange={(e) => setNewExplanation(e.target.value)}
            className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={t.projectExplanation}
            rows="4"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            {t.add}
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
          className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-800'} rounded-lg`}
        >
          <option value="">{t.selectPlaceholder}</option>
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