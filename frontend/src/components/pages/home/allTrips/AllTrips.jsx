import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import { getAllTrips } from "../../../slice/slice";
import { useTheme } from "../../../context/ThemeContext"; // import context

/* ------------------------------- SKELETON CARD ------------------------------- */
const TripSkeleton = () => {
  const { isDark } = useTheme(); // get theme from context
  

  return (
    <div
      className={`rounded-2xl shadow-xl p-6 max-md:p-4 max-sm:p-3 animate-pulse transition-colors duration-300 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between mb-4 max-sm:flex-col max-sm:gap-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
            <div>
              <div className={`h-4 w-24 rounded mb-1 ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
              <div className={`h-3 w-16 rounded ${isDark ? "bg-gray-500" : "bg-gray-200"}`} />
            </div>
          </div>
        ))}
      </div>
      <div className={`h-4 w-3/4 rounded mb-4 ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`h-4 rounded ${isDark ? "bg-gray-500" : "bg-gray-200"}`} />
        ))}
      </div>
      <div className={`h-3 w-32 rounded mt-4 ${isDark ? "bg-gray-500" : "bg-gray-200"}`} />
    </div>
  );
};

/* ------------------------------- MAIN COMPONENT ------------------------------- */
const AllTrips = () => {
  const dispatch = useDispatch();
  const { allTrips, loading, error } = useSelector((state) => state.auth);
  const { isDark } = useTheme(); // get theme from context
  console.log(isDark);


  useEffect(() => {
    dispatch(getAllTrips());
  }, [dispatch]);

  const containerClass = isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800";
  const cardClass = isDark
    ? "bg-gray-800 text-gray-200 hover:shadow-2xl"
    : "bg-white text-gray-900 hover:shadow-2xl";

  if (loading) {
    return (
      <div className={`min-h-screen p-8 max-md:p-4 max-sm:p-3 transition-colors duration-300 ${containerClass}`}>
        <h2 className="text-2xl max-sm:text-xl font-bold text-center mb-6">All Trips</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-sm:gap-4">
          {[...Array(6)].map((_, index) => (
            <TripSkeleton key={index} />
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

  if (!allTrips || allTrips.length === 0) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        No trips found
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 max-md:p-4 max-sm:p-3 transition-colors duration-300 ${containerClass}`}>
      <h2 className="text-2xl max-sm:text-xl font-bold text-center mb-6">All Trips</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-sm:gap-4">
        {allTrips.map((trip) => (
          <div
            key={trip?._id}
            className={`rounded-2xl shadow-xl transition p-6 max-md:p-4 max-sm:p-3 ${cardClass}`}
          >
            {/* Driver & Vehicle */}
            <div className="flex justify-between mb-4 max-sm:flex-col max-sm:gap-3">
              <div className="flex items-center gap-3">
                <FaUser className="text-indigo-600 text-lg max-sm:text-base" />
                <div>
                  <p className="font-semibold text-sm max-sm:text-xs">{trip?.driver_id?.name}</p>
                  <p className="text-xs">{`Driver`}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaTruck className="text-green-600 text-lg max-sm:text-base" />
                <div>
                  <p className="font-semibold text-sm max-sm:text-xs">{trip?.vehicle_id?.vehicle_number}</p>
                  <p className="text-xs">{trip?.vehicle_id?.model}</p>
                </div>
              </div>
            </div>

            {/* Route */}
            <div className={`flex items-start gap-2 mb-3 text-sm max-sm:text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              <FaMapMarkerAlt className="mt-0.5" />
              <span className="font-medium wrap-break-word">
                {trip?.start_location} → {trip?.end_location}
              </span>
            </div>

            {/* Metrics */}
            <div className={`grid grid-cols-2 max-sm:grid-cols-1 gap-4 text-sm max-sm:text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              <p>Distance: <b>{trip?.distance_km} km</b></p>
              <p>Fuel Used: <b>{trip?.fuel_used_ltr} L</b></p>
              <p>Time Taken: <b>{trip?.time_taken_hr} hr</b></p>
              <p>Avg Speed: <b>{Number(trip?.avg_speed)?.toFixed(2)} km/h</b></p>
              <p>Efficiency: <b>{trip?.efficiency} km/L</b></p>
            </div>

            {/* Date */}
            <div className={`text-xs max-sm:text-[10px] mt-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Created on {new Date(trip?.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrips;
