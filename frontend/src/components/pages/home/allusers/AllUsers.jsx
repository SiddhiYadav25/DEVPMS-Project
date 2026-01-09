import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { getAllUsers } from "../../../slice/slice";
import { useTheme } from "../../../context/ThemeContext"; // global theme

/* ---------------- Skeleton Card ---------------- */
const UserSkeleton = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-2xl shadow-xl p-6 animate-pulse transition-colors duration-300 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-200"}`} />
        <div className="space-y-2">
          <div className={`h-4 w-32 rounded ${isDark ? "bg-gray-600" : "bg-gray-200"}`} />
          <div className={`h-3 w-20 rounded ${isDark ? "bg-gray-500" : "bg-gray-200"}`} />
        </div>
      </div>

      <div className={`flex items-center gap-2 mb-4`}>
        <div className={`h-4 w-4 rounded ${isDark ? "bg-gray-500" : "bg-gray-200"}`} />
        <div className={`h-3 w-40 rounded ${isDark ? "bg-gray-500" : "bg-gray-200"}`} />
      </div>

      <div className={`h-6 w-20 rounded-full ${isDark ? "bg-gray-500" : "bg-gray-200"}`} />
    </div>
  );
};

const AllUsers = () => {
  const dispatch = useDispatch();
  const { allusers, loading, error } = useSelector((state) => state.auth);
  const { isDark } = useTheme();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const containerClass = isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800";
  const cardClass = isDark
    ? "bg-gray-800 text-gray-200 hover:shadow-2xl"
    : "bg-white text-gray-900 hover:shadow-2xl";

  /* ---------------- Skeleton UI ---------------- */
  if (loading) {
    return (
      <div className={`min-h-screen p-8 transition-colors duration-300 ${containerClass}`}>
        <h2 className="text-2xl font-bold text-center mb-6">All Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <UserSkeleton key={i} />
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

  if (!allusers || allusers.length === 0) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        No users found
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${containerClass}`}>
      <h2 className="text-2xl font-bold text-center mb-6">All Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allusers.map((user) => (
          <div
            key={user._id}
            className={`rounded-2xl shadow-xl transition p-6 ${cardClass}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? "bg-gray-700" : "bg-indigo-100"
                }`}
              >
                <FaUser className={isDark ? "text-gray-200" : "text-indigo-600 text-xl"} />
              </div>
              <div>
                <h3 className={isDark ? "text-gray-200 font-semibold text-lg" : "text-gray-800 font-semibold text-lg"}>
                  {user.name}
                </h3>
                <p className={isDark ? "text-gray-400 text-sm capitalize" : "text-gray-500 text-sm capitalize"}>
                  {user.role}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              <FaEnvelope />
              <span>{user.email}</span>
            </div>

            <div className="mt-4">
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  user.role === "admin"
                    ? isDark
                      ? "bg-green-700 text-green-200"
                      : "bg-green-100 text-green-700"
                    : isDark
                    ? "bg-blue-700 text-blue-200"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
