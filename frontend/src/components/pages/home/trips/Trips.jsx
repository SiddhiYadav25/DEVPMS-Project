import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import { getAllTrips } from "../../../slice/slice";
import { useTheme } from "../../../context/ThemeContext"; // dark mode

/* ---------------- Skeleton Card ---------------- */
const TripSkeleton = ({ isDark }) => (
  <div
    className={`rounded-2xl shadow-xl p-6 max-md:p-4 max-sm:p-3 animate-pulse ${
      isDark ? "bg-gray-800" : "bg-white"
    }`}
  >
    <div className="flex justify-between mb-4 max-sm:flex-col max-sm:gap-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
        <div className="space-y-2">
          <div className="w-24 h-4 bg-gray-200 rounded" />
          <div className="w-16 h-3 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
        <div className="space-y-2">
          <div className="w-24 h-4 bg-gray-200 rounded" />
          <div className="w-16 h-3 bg-gray-200 rounded" />
        </div>
      </div>
    </div>

    <div className="h-4 bg-gray-200 rounded mb-3 w-3/4" />

    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded w-full" />
      ))}
    </div>

    <div className="h-3 mt-4 bg-gray-200 rounded w-1/3" />
  </div>
);

const Trips = () => {
  const dispatch = useDispatch();
  const { allTrips, loading, error } = useSelector((state) => state.auth);
  const { isDark } = useTheme(); // dark mode

  useEffect(() => {
    dispatch(getAllTrips());
  }, [dispatch]);

  const containerClass = isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900";
  const cardClass = isDark
    ? "bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition p-6 max-md:p-4 max-sm:p-3"
    : "bg-white rounded-2xl shadow-xl hover:shadow-2xl transition p-6 max-md:p-4 max-sm:p-3";

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className={`min-h-screen p-8 max-md:p-4 max-sm:p-3 grid grid-cols-1 lg:grid-cols-2 gap-6 max-sm:gap-4 ${containerClass}`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <TripSkeleton key={i} isDark={isDark} />
        ))}
      </div>
    );
  }

  /* ---------- ERROR ---------- */
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  /* ---------- EMPTY ---------- */
  if (!allTrips || allTrips.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        No trips found
      </div>
    );
  }

  /* ---------- DATA ---------- */
  return (
    <div className={`min-h-screen p-8 max-md:p-4 max-sm:p-3 ${containerClass}`}>
      <h2 className="text-2xl max-sm:text-xl font-bold text-center mb-6">
        All Trips
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-sm:gap-4">
        {allTrips.map((trip) => (
          <div key={trip?._id} className={cardClass}>
            {/* Driver & Vehicle */}
            <div className="flex justify-between mb-4 max-sm:flex-col max-sm:gap-3">
              <div className="flex items-center gap-3">
                <FaUser className="text-indigo-500 text-lg max-sm:text-base" />
                <div>
                  <p className="font-semibold text-sm max-sm:text-xs">
                    {trip?.driver_id?.name}
                  </p>
                  <p className="text-xs text-gray-400">Driver</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaTruck className="text-green-500 text-lg max-sm:text-base" />
                <div>
                  <p className="font-semibold text-sm max-sm:text-xs">
                    {trip?.vehicle_id?.vehicle_number}
                  </p>
                  <p className="text-xs text-gray-400">{trip?.vehicle_id?.model}</p>
                </div>
              </div>
            </div>

            {/* Route */}
            <div className="flex items-start gap-2 mb-3 text-sm max-sm:text-xs">
              <FaMapMarkerAlt className="mt-0.5" />
              <span className="font-medium wrap-break-word">
                {trip?.start_location} → {trip?.end_location}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 text-sm max-sm:text-xs">
              <p>
                Distance: <b>{trip?.distance_km} km</b>
              </p>
              <p>
                Fuel Used: <b>{trip?.fuel_used_ltr} L</b>
              </p>
              <p>
                Time Taken: <b>{trip?.time_taken_hr} hr</b>
              </p>
              <p>
                Avg Speed: <b>{Number(trip?.avg_speed)?.toFixed(2)} km/h</b>
              </p>
              <p>
                Efficiency: <b>{trip?.efficiency} km/L</b>
              </p>
            </div>

            {/* Date */}
            <div className="text-xs max-sm:text-[10px] mt-4 text-gray-400">
              Created on {new Date(trip?.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
