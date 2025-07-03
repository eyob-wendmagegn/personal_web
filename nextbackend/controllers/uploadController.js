const Upload = require('../models/Upload');
const upload = require('../utils/storage');
const path = require('path');
const fs = require('fs');

exports.uploadFile = async (req, res) => {
  try {
    const { email } = req.body;
    const { path, filename, originalname } = req.file;
    const type = req.body.type || (req.file.mimetype.startsWith('image/') ? 'image' : 'file');
    const url = `/upload/${type}/${filename}`;
    const newUpload = new Upload({ type, email, filename, url, originalname });
    await newUpload.save();
    console.log(`File saved at: ${path}, URL: ${url}`);
    res.status(201).json({ message: 'Upload successful', upload: newUpload });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUploads = async (req, res) => {
  try {
    const { email } = req.params;
    const uploads = await Upload.find({ email }).sort({ updatedAt: -1 });
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteUpload = async (req, res) => {
  try {
    const { email, id } = req.params;
    const upload = await Upload.findOneAndDelete({ _id: id, email });
    if (upload) {
      const filePath = path.join(__dirname, '..', 'upload', upload.type, upload.filename);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete the file
          console.log(`File deleted at: ${filePath}`);
        } else {
          console.log(`File not found at: ${filePath}`);
        }
      } catch (fileError) {
        console.error('File deletion error:', fileError);
      }
      res.status(200).json({ message: 'Upload deleted successfully' });
    } else {
      res.status(404).json({ error: 'Upload not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};