const Trip = require("../models/Trip");
const User = require("../models/User");

exports.createTrip = async (req, res) => {
  try {
    const {
      driver_id,
      vehicle_id,
      fuel_used_ltr,
      time_taken_hr,
    } = req.body;

    /* ---------------- BASIC VALIDATION ---------------- */
    if (!driver_id || !vehicle_id) {
      return res.status(400).json({
        message: "Driver & Vehicle are required",
      });
    }

    if (fuel_used_ltr <= 0 || time_taken_hr <= 0) {
      return res.status(400).json({
        message: "Fuel and Time must be greater than zero",
      });
    }

    /* ---------------- DRIVER EXISTS CHECK ---------------- */
    const driver = await User.findById(driver_id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    if (driver.role !== "driver") {
      return res.status(400).json({
        message: "Selected user is not a driver",
      });
    }

    /* ---------------- ROLE AUTHORIZATION ---------------- */
    // If logged-in user is driver → must be same driver
    if (
      req.user.role === "driver" &&
      req.user.userId !== driver_id
    ) {
      return res.status(403).json({
        message: "Drivers can only create trips for themselves",
      });
    }

    /* ---------------- CREATE TRIP ---------------- */
    const trip = await Trip.create(req.body);

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* --------------------------------
   GET ALL TRIPS
-------------------------------- */
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("driver_id", "name email role")
      .populate("vehicle_id", "vehicle_number model fuel_type")
      .sort({ createdAt: -1 });

    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* --------------------------------
   GET TRIPS BY DRIVER
-------------------------------- */
exports.getTripsByDriver = async (req, res) => {
  try {
    const trips = await Trip.find({ driver_id: req.params.driverId })
      .populate("vehicle_id", "vehicle_number model fuel_type")
      .sort({ createdAt: -1 });

    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* --------------------------------
   UPDATE TRIP
-------------------------------- */
exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    Object.assign(trip, req.body);

    await trip.save(); // triggers pre-save calculation

    res.json({
      message: "Trip updated successfully",
      trip,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* --------------------------------
   DELETE TRIP
-------------------------------- */
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
