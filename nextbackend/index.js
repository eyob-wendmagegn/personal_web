require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend origin
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Login Schema
const loginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });
const Login = mongoose.model('Login', loginSchema);

// Register Schema
const registerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });
const Register = mongoose.model('Register', registerSchema);

// Other Content Schema
const otherContentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });
const OtherContent = mongoose.model('other', otherContentSchema);

// Add Projects Schema
const addProjectsSchema = new mongoose.Schema({
  type: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: false },
  link: { type: String, required: false },
  explanation: { type: String, required: false },
}, { timestamps: true });
const AddProjects = mongoose.model('addprojects', addProjectsSchema);

// Store Experience Schema
const storeExperienceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });
const StoreExperience = mongoose.model('storeexperience', storeExperienceSchema);

// Contact Info Schema
const contactInfoSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
const ContactInfo = mongoose.model('contactinfo', contactInfoSchema);

// Upload Schema
const uploadSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['image', 'file'] },
  email: { type: String, required: true },
  filename: { type: String, required: true },
  url: { type: String, required: true },
  originalname: { type: String, required: true },
}, { timestamps: true });
const Upload = mongoose.model('upload', uploadSchema);

// File Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.type || (file.mimetype.startsWith('image/') ? 'image' : 'file');
    const dir = path.join(__dirname, 'upload', type);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9-_.]/g, '_')); // Sanitize filename
  },
});
const upload = multer({ storage });

// Admin Login Endpoint
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (email === 'eyobwende18@gmail.com' && password === 'eyob1919') {
    res.status(200).json({ message: 'Admin login successful' });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
});

// Signup Endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new Register({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'Login successful', email });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Save User Content
app.post('/api/save-content', async (req, res) => {
  try {
    const { type, content, email, title, link, explanation, _id } = req.body;
    if (type === 'projects') {
      if (_id) {
        const updatedProject = await AddProjects.findByIdAndUpdate(_id, { title, link, explanation }, { new: true });
        if (!updatedProject) throw new Error('Project not found');
      } else {
        const newContent = new AddProjects({ type, email, title, link, explanation });
        await newContent.save();
      }
    } else if (type === 'experience') {
      const newContent = new StoreExperience({ type, content, email });
      await newContent.save();
    } else {
      const newContent = new OtherContent({ type, content, email });
      await newContent.save();
    }
    res.status(201).json({ message: 'Content saved successfully' });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Save Contact Message
app.post('/api/save-contact', async (req, res) => {
  try {
    const { email, message } = req.body;
    const newMessage = new ContactInfo({ email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Contact message saved successfully' });
  } catch (error) {
    console.error('Save contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete User Content
app.delete('/api/delete-content/:email/:type/:id', async (req, res) => {
  try {
    const { email, type, id } = req.params;
    if (type === 'projects') {
      const result = await AddProjects.findOneAndDelete({ _id: id, email, type });
      if (result) {
        res.status(200).json({ message: 'Project deleted successfully' });
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    } else if (type === 'experience') {
      const result = await StoreExperience.findOneAndDelete({ _id: id, email, type });
      if (result) {
        res.status(200).json({ message: 'Experience deleted successfully' });
      } else {
        res.status(404).json({ error: 'Experience not found' });
      }
    } else {
      const result = await OtherContent.findOneAndDelete({ _id: id, email, type });
      if (result) {
        res.status(200).json({ message: 'Content deleted successfully' });
      } else {
        res.status(404).json({ error: 'Content not found' });
      }
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get User Content
app.get('/api/get-content/:email/:type', async (req, res) => {
  try {
    const { email, type } = req.params;
    let content;
    if (type === 'projects') {
      content = await AddProjects.find({ email, type }).sort({ updatedAt: -1 });
    } else if (type === 'experience') {
      content = await StoreExperience.find({ email, type }).sort({ updatedAt: -1 }).limit(1);
    } else {
      content = await OtherContent.find({ email, type }).sort({ updatedAt: -1 }).limit(1);
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Contact Messages
app.get('/api/get-contact/:email', async (req, res) => {
  try {
    const messages = await ContactInfo.find().sort({ timestamp: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload Endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { email } = req.body;
    const { path, filename, originalname } = req.file;
    const type = req.body.type || (req.file.mimetype.startsWith('image/') ? 'image' : 'file');
    const url = `/upload/${type}/${filename}`; // Match the serving path
    const newUpload = new Upload({ type, email, filename, url, originalname });
    await newUpload.save();
    console.log(`File saved at: ${path}, URL: ${url}`); // Debug file location
    res.status(201).json({ message: 'Upload successful', upload: newUpload });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Uploads Endpoint
app.get('/api/uploads/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const uploads = await Upload.find({ email }).sort({ updatedAt: -1 });
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete Upload Endpoint
app.delete('/api/delete-upload/:email/:id', async (req, res) => {
  try {
    const { email, id } = req.params;
    const upload = await Upload.findOneAndDelete({ _id: id, email });
    if (upload) {
      const filePath = path.join(__dirname, 'upload', upload.type, upload.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      res.status(200).json({ message: 'Upload deleted successfully' });
    } else {
      res.status(404).json({ error: 'Upload not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve Static Files
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});