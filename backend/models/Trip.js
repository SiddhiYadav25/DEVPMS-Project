const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    driver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    start_location: String,
    end_location: String,

    distance_km: {
      type: Number,
      required: true,
      min: 0,
    },

    fuel_used_ltr: {
      type: Number,
      required: true,
      min: 0,
    },

    time_taken_hr: {
      type: Number,
      required: true,
      min: 0,
    },

    efficiency: Number,     // km/l
    avg_speed: Number,      // km/h
  },
  { timestamps: true }
);

/* 📐 Auto calculations */
tripSchema.pre("save", async function () {
  if (this.distance_km && this.fuel_used_ltr) {
    this.efficiency = this.distance_km / this.fuel_used_ltr;
  }

  if (this.distance_km && this.time_taken_hr) {
    this.avg_speed = this.distance_km / this.time_taken_hr;
  }
});

module.exports = mongoose.model("Trip", tripSchema);
