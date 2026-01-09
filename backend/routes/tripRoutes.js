const express = require("express");
const router = express.Router();
const {
  createTrip,
  getTrips,
  getTripsByDriver,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");

const { protect } = require("../middleware/auth");

router.post("/", protect, createTrip);
router.get("/", protect, getTrips);
router.get("/driver/:driverId", protect, getTripsByDriver);
router.put("/:id", protect, updateTrip);
router.delete("/:id", protect, deleteTrip);

module.exports = router;
