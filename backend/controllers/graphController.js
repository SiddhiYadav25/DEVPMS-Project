const Trip = require("../models/Trip");

/* -----------------------------
   1️⃣ Trips Count Per Driver
----------------------------- */
exports.tripsPerDriver = async (req, res) => {
  const data = await Trip.aggregate([
    {
      $group: {
        _id: "$driver_id",
        totalTrips: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "driver",
      },
    },
    { $unwind: "$driver" },
    {
      $project: {
        driverName: "$driver.name",
        totalTrips: 1,
      },
    },
  ]);

  res.json(data);
};

/* -----------------------------
   2️⃣ Fuel Efficiency Per Driver
----------------------------- */
exports.fuelEfficiencyPerDriver = async (req, res) => {
  const data = await Trip.aggregate([
    {
      $group: {
        _id: "$driver_id",
        avgEfficiency: { $avg: "$efficiency" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "driver",
      },
    },
    { $unwind: "$driver" },
    {
      $project: {
        driverName: "$driver.name",
        avgEfficiency: { $round: ["$avgEfficiency", 2] },
      },
    },
  ]);

  res.json(data);
};

/* -----------------------------
   3️⃣ Distance Covered Per Day
----------------------------- */
exports.distancePerDay = async (req, res) => {
  const data = await Trip.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        totalDistance: { $sum: "$distance_km" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(data);
};

/* -----------------------------
   4️⃣ Fuel Used Per Vehicle
----------------------------- */
exports.fuelPerVehicle = async (req, res) => {
  const data = await Trip.aggregate([
    {
      $group: {
        _id: "$vehicle_id",
        totalFuel: { $sum: "$fuel_used_ltr" },
      },
    },
    {
      $lookup: {
        from: "vehicles",
        localField: "_id",
        foreignField: "_id",
        as: "vehicle",
      },
    },
    { $unwind: "$vehicle" },
    {
      $project: {
        vehicleNumber: "$vehicle.vehicle_number",
        totalFuel: 1,
      },
    },
  ]);

  res.json(data);
};

/* -----------------------------
   5️⃣ Avg Speed Per Driver
----------------------------- */
exports.avgSpeedPerDriver = async (req, res) => {
  const data = await Trip.aggregate([
    {
      $group: {
        _id: "$driver_id",
        avgSpeed: { $avg: "$avg_speed" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "driver",
      },
    },
    { $unwind: "$driver" },
    {
      $project: {
        driverName: "$driver.name",
        avgSpeed: { $round: ["$avgSpeed", 2] },
      },
    },
  ]);

  res.json(data);
};
