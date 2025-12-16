require("dotenv").config();  
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const contactRoutes = require("./Routers/contactRoutes");
app.use("/api", contactRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
