const express = require("express");
const mongoose = require("mongoose");
const graphRouter = require("./routes/graphRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ---------------- Middleware ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- Database ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

/* ---------------- Routes ---------------- */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));
app.use("/api/graphs", graphRouter);

/* ---------------- Health Check ---------------- */
app.get("/", (req, res) => {
  res.send("Fleet Management API running ");
});

/* ---------------- Error Handler ---------------- */
// app.use((err, req, res, next) => {
//   res.status(500).json({ error: err.message });
// });

/* ---------------- Server ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
