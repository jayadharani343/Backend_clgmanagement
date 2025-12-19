const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllDepartments,
  addDepartment,
  deleteDepartment
} = require("../Controllers/adminController");

// Dashboard
router.get("/stats", getDashboardStats);

// User Management
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Department Management
router.get("/departments", getAllDepartments);
router.post("/departments", addDepartment);
router.delete("/departments/:id", deleteDepartment);

module.exports = router;