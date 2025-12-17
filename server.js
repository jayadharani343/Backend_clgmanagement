require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./Routers/authRoutes");
const contactRoutes = require("./Routers/contactRoutes");
const userRoutes = require("./Routers/userRoutes");
const departmentRoutes = require("./Routers/departmentRoutes"); // ✅ NEW

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);         // Register & Login
app.use("/api/contact", contactRoutes);   // Contact page
app.use("/api/users", userRoutes);        // Admin User Management
app.use("/api/departments", departmentRoutes); // ✅ Department Management

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
