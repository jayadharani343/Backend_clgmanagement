const User = require("../Models/User");
const bcrypt = require("bcryptjs");

// GET all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD user (Admin adds user)
const addUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      role,
      age,
      rollNo,
      marks
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Auto-generate password
    const defaultPassword = "user@123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const newUser = new User({
      name,
      email,
      phone,
      role,
      age,
      rollNo,
      marks,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "User added successfully",
      user: newUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
