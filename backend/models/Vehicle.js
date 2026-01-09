const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicle_number: {
      type: String,
      required: true,
      unique: true,
    },

    model: {
      type: String,
      trim: true,
    },

    fuel_type: {
      type: String,
      enum: ["Petrol", "Diesel", "CNG", "Electric"],
      required: true,
    },

    last_service_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
