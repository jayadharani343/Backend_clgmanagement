const express = require("express");
const router = express.Router();
const { sendMessage } = require("../Controllers/contactController");

router.post("/contact", sendMessage);

module.exports = router;
