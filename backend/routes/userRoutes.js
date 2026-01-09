const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController");
const { protect } = require("../middleware/auth");

/* Users (Admin only – can add role check later) */
router.get("/", protect, getUsers);

module.exports = router;
