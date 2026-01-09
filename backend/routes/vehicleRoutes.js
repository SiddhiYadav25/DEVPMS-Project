const express = require("express");
const router = express.Router();
const {
  createVehicle,
  getVehicles,
} = require("../controllers/vehicleController");
const { protect } = require("../middleware/auth");

/* Vehicles */
router.post("/", protect, createVehicle);
router.get("/", protect, getVehicles);

module.exports = router;
