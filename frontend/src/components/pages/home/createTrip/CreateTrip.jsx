import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addTrip, getAllUsers, getAllVehicles } from "../../../slice/slice";
import { useTheme } from "../../../context/ThemeContext";

const CreateTrip = () => {
  const dispatch = useDispatch();
  const { user, allusers, allVehicles, loading } = useSelector((state) => state.auth);
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    driver_id: "",
    vehicle_id: "",
    start_location: "",
    end_location: "",
    distance_km: "",
    fuel_used_ltr: "",
    time_taken_hr: "",
  });

  // Load all drivers (if admin) and all vehicles
  useEffect(() => {
    dispatch(getAllVehicles()); // always fetch vehicles
    if (user?.role === "admin") {
      dispatch(getAllUsers());
    } else if (user?.role === "driver") {
      setFormData((prev) => ({ ...prev, driver_id: user.id }));
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addTrip(formData)).unwrap();
      toast.success("Trip created successfully");
      setFormData({
        driver_id: user?.role === "driver" ? user.id : "",
        vehicle_id: "",
        start_location: "",
        end_location: "",
        distance_km: "",
        fuel_used_ltr: "",
        time_taken_hr: "",
      });
    } catch (err) {
      toast.error(err || "Failed to create trip");
    }
  };

  const { driver_id, vehicle_id, start_location, end_location, distance_km, fuel_used_ltr, time_taken_hr } = formData;

  const containerClass = isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800";
  const cardClass = isDark ? "bg-gray-800 shadow-xl" : "bg-white shadow-2xl";
  const inputBg = isDark ? " bg-transparent text-gray-200 placeholder-gray-400" : "bg-transparent text-gray-900 placeholder-gray-500";
  const labelBg = isDark ? "bg-gray-800 text-gray-200" : "bg-white text-black";

  return (
    <div className={`size-full p-8 flex justify-center items-center transition-colors duration-300 ${containerClass}`}>
      <div className={`h-3/4 w-1/3 rounded-2xl p-10 overflow-y-auto max-md:w-full max-sm:p-2 transition-colors duration-300 ${cardClass}`}>
        <h2 className="text-2xl font-bold text-center mb-6">Create Trip</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* DRIVER FIELD */}
          {user?.role === "admin" ? (
            <div>
     
              <select
                name="driver_id"
                value={driver_id}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded-lg ${inputBg}`}
              >
                <option value="" hidden>Select driver</option>
                {allusers
                  .filter((u) => u.role === "driver")
                  .map((d) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
              </select>
            </div>
          ) : (
            <input type="hidden" name="driver_id" value={driver_id} />
          )}

          {/* VEHICLE FIELD */}
          <div>
        
            <select
              name="vehicle_id"
              value={vehicle_id}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded-lg ${inputBg}`}
            >
              <option value="" hidden>Select vehicle</option>
              {allVehicles.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.vehicle_number} - {v.model}
                </option>
              ))}
            </select>
          </div>

          {/* OTHER FIELDS */}
          <Field id="start_location" label="Start Location" value={start_location} onChange={handleChange} inputBg={inputBg} labelBg={labelBg} />
          <Field id="end_location" label="End Location" value={end_location} onChange={handleChange} inputBg={inputBg} labelBg={labelBg} />
          <Field id="distance_km" label="Distance (KM)" type="number" value={distance_km} onChange={handleChange} inputBg={inputBg} labelBg={labelBg} />
          <Field id="fuel_used_ltr" label="Fuel Used (Liters)" type="number" value={fuel_used_ltr} onChange={handleChange} inputBg={inputBg} labelBg={labelBg} />
          <Field id="time_taken_hr" label="Time Taken (Hours)" type="number" value={time_taken_hr} onChange={handleChange} inputBg={inputBg} labelBg={labelBg} />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white transition p-2 rounded-lg font-semibold flex justify-center items-center ${loading ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {loading ? "Saving..." : "Save Trip"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* 🔁 Reusable Field Component */
const Field = ({ id, label, value, onChange, type = "text", inputBg, labelBg }) => (
  <div>
    <div className={`flex items-center h-10 border-b px-3 relative group focus-within:border focus-within:rounded-lg ${value ? "border rounded-lg" : ""}`}>
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        required
        className={`w-full p-2 outline-none ${inputBg}`}
      />
      <label
        htmlFor={id}
        className={`absolute p-1 rounded-sm duration-100 left-4
          group-focus-within:-top-3.5 group-focus-within:text-[10px]
          group-focus-within:${labelBg.replace(" ", " group-focus-within:")}
          ${value ? "-top-3.5 text-[10px] " + labelBg : ""}`}
      >
        {label}
      </label>
    </div>
  </div>
);

export default CreateTrip;
