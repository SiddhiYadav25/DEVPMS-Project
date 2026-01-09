import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVehicles } from "../../../slice/slice";
import { useTheme } from "../../../context/ThemeContext";

/* ---------------- Skeleton Card ---------------- */
const VehicleSkeleton = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-2xl shadow-xl p-5 animate-pulse transition-colors duration-300 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className={`h-5 w-32 rounded ${isDark ? "bg-gray-600" : "bg-gray-200"}`} />
        <div className={`h-6 w-20 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-200"}`} />
      </div>

      {/* Body */}
      <div className="space-y-3">
        <div className={`h-4 w-40 rounded ${isDark ? "bg-gray-500" : "bg-gray-200"}`} />
        <div className={`h-4 w-48 rounded ${isDark ? "bg-gray-500" : "bg-gray-200"}`} />
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t">
        <div className={`h-3 w-28 rounded ${isDark ? "bg-gray-500" : "bg-gray-200"}`} />
      </div>
    </div>
  );
};

const AllVehicle = () => {
  const dispatch = useDispatch();
  const { allVehicles, loading, error } = useSelector((state) => state.auth);
  const { isDark } = useTheme();

  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

  const containerClass = isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800";
  const cardClass = isDark
    ? "bg-gray-800 text-gray-200 hover:shadow-2xl"
    : "bg-white text-gray-900 hover:shadow-xl";

  /* ---------------- Skeleton UI ---------------- */
  if (loading) {
    return (
      <div className={`p-6 min-h-screen transition-colors duration-300 ${containerClass}`}>
        <h2 className="text-2xl font-semibold mb-6 text-center">All Vehicles</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <VehicleSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">{error}</div>
    );
  }

  if (!allVehicles.length) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        No vehicles found
      </div>
    );
  }

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${containerClass}`}>
      <h2 className="text-2xl font-semibold mb-6 text-center">All Vehicles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allVehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className={`rounded-2xl transition p-5 ${
              cardClass
            } hover:-translate-y-1 transform duration-300`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-bold ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                {vehicle.vehicle_number}
              </h3>

              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  isDark
                    ? "bg-indigo-700 text-indigo-200"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                {vehicle.fuel_type}
              </span>
            </div>

            {/* Body */}
            <div className={`space-y-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              <p>
                <span className="font-medium">Model:</span> {vehicle.model}
              </p>
              <p>
                <span className="font-medium">Last Service:</span>{" "}
                {new Date(vehicle.last_service_date).toLocaleDateString()}
              </p>
            </div>

            {/* Footer */}
            <div className={`mt-4 pt-3 border-t text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
              Added on {new Date(vehicle.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVehicle;
