const ContactInfo = require('../models/ContactInfo');

exports.saveContact = async (req, res) => {
  try {
    const { email, message } = req.body;
    const newMessage = new ContactInfo({ email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Contact message saved successfully' });
  } catch (error) {
    console.error('Save contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getContact = async (req, res) => {
  try {
    const messages = await ContactInfo.find().sort({ timestamp: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};