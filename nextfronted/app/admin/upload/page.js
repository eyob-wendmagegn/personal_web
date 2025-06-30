'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminUpload() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState({ images: [], files: [] }); // Fixed initial state
  const email = 'eyobwende18@gmail.com'; // Replace with auth later
  const baseUrl = 'http://localhost:5000'; // Update to ngrok URL (e.g., https://abcd1234.ngrok.io)

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/uploads/${email}`, {
        headers: { 'Cache-Control': 'no-cache' },
      });
      const data = response.data || [];
      setUploads({
        images: data.filter(item => item.type === 'image'),
        files: data.filter(item => item.type === 'file'),
      });
    } catch (error) {
      console.error('Fetch uploads error:', error.response?.data || error.message);
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
      const response = await axios.post(`${baseUrl}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload response:', response.data);
      setImage(null);
      fetchUploads();
    } catch (error) {
      console.error('Image upload error:', error.response?.data || error.message);
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
      const response = await axios.post(`${baseUrl}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload response:', response.data);
      setFile(null);
      fetchUploads();
    } catch (error) {
      console.error('File upload error:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/delete-upload/${email}/${id}`);
      console.log('Delete response:', response.data);
      fetchUploads();
    } catch (error) {
      console.error('Delete error:', error.response?.data || error.message);
    }
  };

  const handleDownload = async (url, filename) => {
    try {
      const downloadUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error(`Server responded with ${response.status} for ${downloadUrl}`);

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || downloadUrl.split('/').pop() || 'download';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      console.log('Download initiated for:', downloadUrl);
    } catch (error) {
      console.error('Download error:', error.message);
      const fallbackUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
      window.open(fallbackUrl, '_blank');
      console.log('Fallback: Opened in new tab:', fallbackUrl);
    }
  };

  const handleOpen = (url, originalname) => {
    const openUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    const ext = originalname.split('.').pop().toLowerCase();
    let previewUrl;

    if (['doc', 'docx', 'ppt', 'pptx'].includes(ext)) {
      previewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(openUrl)}&embedded=true`;
      const officeUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(openUrl)}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

      fetch(previewUrl, { method: 'HEAD', mode: 'no-cors', signal: controller.signal })
        .then(response => {
          clearTimeout(timeoutId);
          if (!response.ok) throw new Error('Google Docs inaccessible');
          window.open(previewUrl, '_blank');
        })
        .catch(error => {
          clearTimeout(timeoutId);
          console.error('Google Docs fetch error:', error.message);
          window.open(officeUrl, '_blank');
          console.log('Falling back to Office Online:', officeUrl);
        });
    } else if (ext === 'pdf') {
      previewUrl = openUrl;
      window.open(previewUrl, '_blank');
    } else {
      previewUrl = openUrl;
      window.open(previewUrl, '_blank');
    }
    console.log('Attempted to open:', previewUrl || 'fallback applied');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Upload Dashboard</h1>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Images</h2>
        <form onSubmit={handleImageUpload} className="flex items-center space-x-4 mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 rounded-lg p-2 w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            type="submit"
            disabled={!image}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
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
                onError={(e) => console.error('Image load error:', img.url, e)}
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Files</h2>
        <form onSubmit={handleFileUpload} className="flex items-center space-x-4 mb-6">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 rounded-lg p-2 w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            type="submit"
            disabled={!file}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Upload
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {uploads.files.map((file) => (
            <div
              key={file._id}
              className="border border-gray-200 rounded-lg p-4 shadow-md flex items-center justify-between cursor-pointer"
              onDoubleClick={() => handleOpen(file.url, file.originalname)}
            >
              <span className="text-gray-700 truncate max-w-xs">{file.originalname}</span>
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