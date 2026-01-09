const express = require("express");
const router = express.Router();
const {
  tripsPerDriver,
  fuelEfficiencyPerDriver,
  distancePerDay,
  fuelPerVehicle,
  avgSpeedPerDriver,
} = require("../controllers/graphController");

const { protect } = require("../middleware/auth");

router.get("/trips-per-driver", protect, tripsPerDriver);
router.get("/fuel-efficiency-driver", protect, fuelEfficiencyPerDriver);
router.get("/distance-per-day", protect, distancePerDay);
router.get("/fuel-per-vehicle", protect, fuelPerVehicle);
router.get("/avg-speed-driver", protect, avgSpeedPerDriver);

module.exports = router;
