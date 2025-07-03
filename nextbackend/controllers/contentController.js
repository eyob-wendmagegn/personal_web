const OtherContent = require('../models/OtherContent');
const AddProjects = require('../models/AddProjects');
const StoreExperience = require('../models/StoreExperience');

exports.saveContent = async (req, res) => {
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
};

exports.deleteContent = async (req, res) => {
  try {
    const { email, type, id } = req.params;
    let result;
    if (type === 'projects') {
      result = await AddProjects.findOneAndDelete({ _id: id, email, type });
    } else if (type === 'experience') {
      result = await StoreExperience.findOneAndDelete({ _id: id, email, type });
    } else {
      result = await OtherContent.findOneAndDelete({ _id: id, email, type });
    }
    if (result) {
      res.status(200).json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully` });
    } else {
      res.status(404).json({ error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found` });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getContent = async (req, res) => {
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
};