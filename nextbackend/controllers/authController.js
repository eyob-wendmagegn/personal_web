const Login = require("../models/Login");
const Register = require("../models/Register");

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email === "eyobwende18@gmail.com" && password === "eyob1919") {
    res.status(200).json({ message: "Admin login successful" });
  } else {
    res.status(401).json({ error: "Invalid admin credentials" });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new Register({ email, password });
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: "Login successful", email });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await Register.findOne({ email, password: oldPassword });
    if (!user) {
      return res.status(401).json({ error: "Invalid old password" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Server error" });
  }
};