import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { FaCar, FaBinoculars, FaUserSecret, FaMoon, FaSun } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { GiCrossMark } from "react-icons/gi";
import { useTheme } from "../../../context/ThemeContext"; // global theme

const SideNav = ({ toggle, setToggle, handelCancel, showSideNav }) => {
  const { user } = useSelector((state) => state.auth);
  const { isDark, toggleTheme } = useTheme(); // use global theme

  // Define menu items
  let menuItems = [
    { label: "Create Vehicle", to: "", icon: <FaCar />, },
    { label: "Create Trip", to: "create-trip", icon: <IoIosSpeedometer /> },
    { label: "Trips", to: "trips", icon: <FaBinoculars /> },
    { label: "All Trips", to: "all-trips", icon: <FaBinoculars />, adminOnly: true },
    { label: "DashBoard", to: "dashboard", icon: <GoGraph />, adminOnly: true },
    { label: "All Users", to: "all-users", icon: <FaUserSecret />, adminOnly: true },
    { label: "All Vehicles", to: "all-vehicles", icon: <IoCarSport /> },
  ];

  // Filter menu items based on role
  if (user?.role !== "admin" && user?.role !== "manager") {
    menuItems = menuItems.filter((item) => !item.adminOnly);
  }

  // Dark mode classes
  const containerBg = isDark ? "bg-gray-800" : "";
  const userText = isDark ? "text-gray-200" : "";
  const userSubText = isDark ? "text-gray-400" : "";

  const menuActiveBg = isDark ? "bg-gray-700 text-yellow-300" : "bg-gray-400 text-blue-800";
  const menuInactiveBg = isDark
    ? "bg-gray-800 hover:bg-gray-700 hover:text-yellow-400"
    : "bg-gray-200 hover:bg-gray-300 hover:text-red-600";

  return (
    <div className={`w-full h-full p-10 flex flex-col gap-20 relative ${containerBg} transition-colors duration-300`}>
      {/* Close button for mobile */}
      <div
        className={`absolute right-0 text-red-600 top-0 text-3xl p-2 hidden rounded-bl-2xl bg-black/10 ${showSideNav ? "max-sm:block" : "hidden"}`}
        onClick={handelCancel}
      >
        <GiCrossMark />
      </div>

      {/* USER INFO */}
      <div className="flex items-center gap-3">
        <div className={`w-20 h-20 rounded-2xl flex justify-center items-center text-2xl font-bold uppercase ${isDark ? "bg-gray-500" : "bg-gray-200"}`}>
          {user?.name?.[0] || "U"}
        </div>
        <div className="h-20 flex flex-col justify-center capitalize">
          <span className={`font-semibold ${userText}`}>{user?.name || "User"}</span>
          <span className={`text-sm ${userSubText}`}>{user?.role || "role"}</span>
        </div>
      </div>

      {/* MENU ITEMS */}
      <div className="w-full flex flex-col gap-5 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ""}
            className={({ isActive }) =>
              `w-full h-10 rounded-xl flex justify-between px-5 text-sm items-center font-bold tracking-wider duration-150 transform  ${isDark?"bg-gray-900 text-white":""}
              ${isActive ? menuActiveBg : menuInactiveBg}`
            }
            onClick={() => setToggle(!toggle)}
          >
            <span>{item.label}</span>
            {item.icon}
          </NavLink>
        ))}

        {/* THEME TOGGLE BUTTON */}
        <button
          onClick={toggleTheme}
          className={`mt-auto w-full h-10 rounded-xl flex justify-center items-center gap-2 px-5 text-sm font-bold
            ${isDark ? "bg-gray-700 hover:bg-gray-600 text-yellow-400" : "bg-gray-200 hover:bg-gray-300 text-gray-900"}`}
        >
          {isDark ? <FaSun /> : <FaMoon />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default SideNav;
