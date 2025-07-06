'use client';

import { useTheme } from '../../../context/ThemeContext';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AdminUpload() {
  const { language, isDarkMode } = useTheme(); // Access language and mode
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState({ images: [], files: [] });
  const [error, setError] = useState(null);
  const [translatedUI, setTranslatedUI] = useState({}); // State for translated UI elements
  const email = 'eyobwende18@gmail.com';
  const baseUrl = 'http://localhost:5000';

  useEffect(() => {
    fetchUploads();
  }, []);

  useEffect(() => {
    // Update translated UI when language changes
    setTranslatedUI({
      dashboardTitle: translateContent('Admin Upload Dashboard'),
      uploadImages: translateContent('Upload Images'),
      uploadFiles: translateContent('Upload Files'),
      errorImage: translateContent('Image upload failed. Try again.'),
      errorFile: translateContent('File upload failed. Try again.'),
      errorDelete: translateContent('Delete failed: Server error. Check ID or file.'),
      errorFetch: translateContent('Failed to fetch uploads. Check server or network. Details:'),
    });
    setError(prevError => (prevError ? translateContent(prevError) : null)); // Update error translation
  }, [language]); // Trigger on language change

  const fetchUploads = async (retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await axios.get(`${baseUrl}/api/uploads/${email}`, {
          headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
          timeout: 5000,
        });
        const data = response.data || [];
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format from server');
        }
        setUploads({
          images: data.filter(item => item.type === 'image'),
          files: data.filter(item => item.type === 'file'),
        });
        setError(null);
        return;
      } catch (error) {
        const errorMsg = error.response
          ? `${error.response.status} - ${error.response.data?.error || error.response.statusText}`
          : error.code === 'ECONNABORTED'
            ? 'Request timed out'
            : error.message;
        console.error('Fetch uploads error [Attempt ' + attempt + ']:', {
          message: error.message,
          code: error.code,
          response: error.response?.data,
          status: error.response?.status,
          url: `${baseUrl}/api/uploads/${email}`,
        });
        if (attempt === retries) {
          setError(`${translatedUI.errorFetch || 'Failed to fetch uploads. Check server or network. Details:'} ${errorMsg}`);
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('type', 'image');
    formData.append('email', email);
    try {
      await axios.post(`${baseUrl}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 5000,
      });
      setImage(null);
      fetchUploads();
      setError(null);
    } catch (error) {
      console.error('Image upload error:', error.response?.data || error.message);
      setError(translatedUI.errorImage || 'Image upload failed. Try again.');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'file');
    formData.append('email', email);
    try {
      await axios.post(`${baseUrl}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 5000,
      });
      setFile(null);
      fetchUploads();
      setError(null);
    } catch (error) {
      console.error('File upload error:', error.response?.data || error.message);
      setError(translatedUI.errorFile || 'File upload failed. Try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/delete-upload/${email}/${id}`, {
        timeout: 5000,
      });
      if (response.status === 200) {
        fetchUploads();
        setError(null);
      } else {
        throw new Error(`Delete failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Delete error:', error.response?.data || error.message);
      setError(translatedUI.errorDelete || 'Delete failed: Server error. Check ID or file.');
    }
  };

  const handleDownload = async (url, filename) => {
    try {
      const downloadUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
      const response = await fetch(downloadUrl, { timeout: 5000 });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'download';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download error:', error.message);
      const fallbackUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
      window.open(fallbackUrl, '_blank');
    }
  };

  const handleOpen = (url, originalname) => {
    const openUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}${url}`;
    const ext = originalname.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext)) {
      window.open(openUrl, '_blank');
      return;
    }

    if (['pdf'].includes(ext)) {
      window.open(openUrl, '_blank');
      return;
    }

    if (['doc', 'docx', 'ppt', 'pptx'].includes(ext)) {
      const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(openUrl)}&embedded=true`;
      window.open(viewerUrl, '_blank');
      return;
    }

    window.open(openUrl, '_blank');
  };

  // Translation function for UI elements and errors
  const translateContent = (text) => {
    const translations = {
      en: {
        'Admin Upload Dashboard': 'Admin Upload Dashboard',
        'Upload Images': 'Upload Images',
        'Upload Files': 'Upload Files',
        'Image upload failed. Try again.': 'Image upload failed. Try again.',
        'File upload failed. Try again.': 'File upload failed. Try again.',
        'Delete failed: Server error. Check ID or file.': 'Delete failed: Server error. Check ID or file.',
        'Failed to fetch uploads. Check server or network. Details:': 'Failed to fetch uploads. Check server or network. Details:',
      },
      am: {
        'Admin Upload Dashboard': 'የአስተዳደር መረጃ መመልከቻ',
        'Upload Images': 'ምስልዎችን መጫን',
        'Upload Files': 'ፋይሎችን መጫን',
        'Image upload failed. Try again.': 'ምስል መጫን አልተቻለም። እባክዎ ይሞክሩ።',
        'File upload failed. Try again.': 'ፋይል መጫን አልተቻለም። እባክዎ ይሞክሩ።',
        'Delete failed: Server error. Check ID or file.': 'ማስወገድ አልተቻለም፡ ሰርቨር ችግር። መለያውን ወይም ፋይልዎን ይፈትሹ።',
        'Failed to fetch uploads. Check server or network. Details:': 'መጫኑን መገንጠጥ አልተቻለም። ሶርቨርወይም የአውታረ መረጃ አዳራሽ ይፈትሹ። ዝርዝሮች፡',
      },
    };
    const normalizedText = text ? text.trim().toLowerCase() : text;
    const langTranslations = translations[language] || translations.en;
    for (const [key, value] of Object.entries(langTranslations)) {
      if (normalizedText === key.toLowerCase()) {
        return value;
      }
    }
    console.log('No translation found for:', normalizedText); // Debug missing translations
    return text || ''; // Fallback to original text or empty if no match
  };

  return (
    <div className={`p-6 max-w-7xl mx-auto ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{translatedUI.dashboardTitle}</h1>
      
      {error && (
        <div className={`mb-4 p-2 rounded-lg ${isDarkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-700'}`}>{error}</div>
      )}

      <div className="mb-12">
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{translatedUI.uploadImages}</h2>
        <form onSubmit={handleImageUpload} className="flex items-center space-x-4 mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className={`border rounded-lg p-2 w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200 file:bg-gray-600 file:text-gray-200 hover:file:bg-gray-500' : 'border-gray-300 bg-white text-gray-800 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'}`}
          />
          <button
            type="submit"
            disabled={!image}
            className={`bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition ${!image ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          >
            Upload
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uploads.images.map((img) => (
            <div key={img._id} className="relative group">
              <img
                src={img.url.startsWith('http') ? img.url : `${baseUrl}${img.url}`}
                alt={img.originalname}
                className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer"
                onDoubleClick={() => handleOpen(img.url, img.originalname)}
              />
              <div className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <button
                  onClick={() => handleDownload(img.url, img.originalname)}
                  className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 mr-2"
                  title="Download"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(img._id)}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  title="Delete"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{translatedUI.uploadFiles}</h2>
        <form onSubmit={handleFileUpload} className="flex items-center space-x-4 mb-6">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className={`border rounded-lg p-2 w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200 file:bg-gray-600 file:text-gray-200 hover:file:bg-gray-500' : 'border-gray-300 bg-white text-gray-800 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'}`}
          />
          <button
            type="submit"
            disabled={!file}
            className={`bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition ${!file ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          >
            Upload
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {uploads.files.map((file) => (
            <div
              key={file._id}
              className={`border rounded-lg p-4 shadow-md flex items-center justify-between cursor-pointer ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-200 hover:shadow-gray-700' : 'border-gray-200 bg-white text-gray-700 hover:shadow-xl'}`}
              onDoubleClick={() => handleOpen(file.url, file.originalname)}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {file.originalname.match(/\.(doc|docx)$/i) ? (
                    <div className={`bg-blue-500 text-white p-2 rounded-lg ${isDarkMode ? 'bg-blue-700' : ''}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                  ) : file.originalname.match(/\.(ppt|pptx)$/i) ? (
                    <div className={`bg-orange-500 text-white p-2 rounded-lg ${isDarkMode ? 'bg-orange-700' : ''}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                      </svg>
                    </div>
                  ) : file.originalname.match(/\.pdf$/i) ? (
                    <div className={`bg-red-500 text-white p-2 rounded-lg ${isDarkMode ? 'bg-red-700' : ''}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                  ) : (
                    <div className={`bg-gray-500 text-white p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : ''}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <span className="text-gray-700 truncate max-w-xs">{file.originalname}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownload(file.url, file.originalname)}
                  className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                  title="Download"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(file._id)}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  title="Delete"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}