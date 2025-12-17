const express = require("express");
const router = express.Router();
const {
  addDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment
} = require("../Controllers/departmentController");

// Department Routes
router.post("/add", addDepartment);
router.get("/all", getDepartments);
router.put("/update/:id", updateDepartment);
router.delete("/delete/:id", deleteDepartment);

module.exports = router;
