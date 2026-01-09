import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTripsPerDriver,
  getFuelEfficiencyPerDriver,
  getDistancePerDay,
  getFuelPerVehicle,
  getAvgSpeedPerDriver,
} from "../../../slice/slice";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useTheme } from "../../../context/ThemeContext"; // dark mode

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const DashBoard = () => {
  const dispatch = useDispatch();
  const {
    tripsPerDriver,
    fuelEfficiencyPerDriver,
    distancePerDay,
    fuelPerVehicle,
    avgSpeedPerDriver,
    loading,
    error,
  } = useSelector((state) => state.auth);

  const { isDark } = useTheme(); // get dark mode

  useEffect(() => {
    dispatch(getTripsPerDriver());
    dispatch(getFuelEfficiencyPerDriver());
    dispatch(getDistancePerDay());
    dispatch(getFuelPerVehicle());
    dispatch(getAvgSpeedPerDriver());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  // Chart data configurations
  const tripsData = {
    labels: tripsPerDriver.map((t) => t.driverName),
    datasets: [
      {
        label: "Total Trips",
        data: tripsPerDriver.map((t) => t.totalTrips),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const efficiencyData = {
    labels: fuelEfficiencyPerDriver.map((t) => t.driverName),
    datasets: [
      {
        label: "Avg Fuel Efficiency",
        data: fuelEfficiencyPerDriver.map((t) => t.avgEfficiency),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const distanceData = {
    labels: distancePerDay.map((t) => t._id),
    datasets: [
      {
        label: "Total Distance (km)",
        data: distancePerDay.map((t) => t.totalDistance),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  const fuelData = {
    labels: fuelPerVehicle.map((t) => t.vehicleNumber),
    datasets: [
      {
        label: "Total Fuel Used (L)",
        data: fuelPerVehicle.map((t) => t.totalFuel),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const speedData = {
    labels: avgSpeedPerDriver.map((t) => t.driverName),
    datasets: [
      {
        label: "Avg Speed (km/h)",
        data: avgSpeedPerDriver.map((t) => t.avgSpeed),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const containerClass = isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900";
  const cardClass = isDark ? "bg-gray-800 shadow rounded p-4" : "bg-white shadow rounded p-4";

  return (
    <div className={`size-full overflow-y-scroll transition-colors duration-300 ${containerClass}`}>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={cardClass}>
          <h2 className="font-bold mb-2">Trips Per Driver</h2>
          <Bar data={tripsData} />
        </div>

        <div className={cardClass}>
          <h2 className="font-bold mb-2">Fuel Efficiency Per Driver</h2>
          <Bar data={efficiencyData} />
        </div>

        <div className={cardClass}>
          <h2 className="font-bold mb-2">Distance Covered Per Day</h2>
          <Line data={distanceData} />
        </div>

        <div className={cardClass}>
          <h2 className="font-bold mb-2">Fuel Used Per Vehicle</h2>
          <Bar data={fuelData} />
        </div>

        <div className={cardClass}>
          <h2 className="font-bold mb-2">Avg Speed Per Driver</h2>
          <Bar data={speedData} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
  