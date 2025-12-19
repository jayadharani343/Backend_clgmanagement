const User = require("../Models/User");
const Department = require("../Models/Department");

// GET DASHBOARD STATS
exports.getDashboardStats = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    
    const totalStudents = await User.countDocuments({ role: "user" });
    const totalDepartments = await Department.countDocuments();
    const newDepartments = await Department.countDocuments({ established: currentYear });
    const newAdmissions = await User.countDocuments({ 
      role: "user",
      createdAt: { $gte: new Date(`${currentYear}-01-01`) }
    });

    res.json({
      totalStudents,
      totalDepartments,
      newDepartments,
      newAdmissions
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL DEPARTMENTS
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD DEPARTMENT
exports.addDepartment = async (req, res) => {
  try {
    const { name, code, established, head } = req.body;
    
    const department = new Department({
      name,
      code,
      established,
      head
    });
    
    await department.save();
    res.status(201).json({ message: "Department added successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Department code already exists" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

// DELETE DEPARTMENT
exports.deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};