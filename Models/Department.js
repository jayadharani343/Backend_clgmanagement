const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    students: {
      type: Number,
      required: true
    },
    hod: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    established: {
      type: String
    },
    faculty: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
