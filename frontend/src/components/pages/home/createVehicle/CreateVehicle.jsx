import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { addVehicle } from '../../../slice/slice'
import { useDispatch } from 'react-redux'
import { useTheme } from '../../../context/ThemeContext' // import theme context

const CreateVehicle = () => {
  const [formData,setFormData]=useState({
    vehicle_number:"",
    model:"",
    fuel_type:"",
    last_service_date:""
  })
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();
  const { isDark } = useTheme(); // get dark mode

  const handleChange =(e)=>{
      let {name,value}= e.target
      setFormData((preVal)=>({...preVal,[name]:value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {vehicle_number,model,fuel_type,last_service_date} = formData;

    if (!vehicle_number || !model || !fuel_type || !last_service_date) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true); 
      await dispatch(addVehicle(formData)).unwrap();
      toast.success("Vehicle added successfully ");

      setFormData({
        vehicle_number: "",
        model: "",
        fuel_type: "",
        last_service_date: "",
      });
    } catch (err) {
      toast.error(err || "Failed to add vehicle");
    } finally {
      setLoading(false); 
    }
  };

  const {vehicle_number,model,fuel_type,last_service_date}=formData

  // dark mode classes
  const containerClass = isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800";
  const cardClass = isDark ? "bg-gray-800 shadow-2xl" : "bg-white shadow-2xl";
  const inputText = isDark ? "text-gray-200" : "text-gray-900";
  const labelBg = isDark ? "bg-gray-800 text-gray-200" : "bg-white text-black";

  return (
    <div className={`size-full p-8 flex justify-center items-center transition-colors duration-300 ${containerClass}`}>
      <div className={`h-2/3 w-1/3 rounded-2xl p-10 max-md:w-full max-md:h-auto max-md:p-5 transition-colors duration-300 ${cardClass}`}>
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Vehicle
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Vehicle Number */}
          <div>
            <div className={`flex items-center h-10 border-b px-3 relative group focus-within:border focus-within:rounded-lg ${vehicle_number ? "border rounded-lg" : ""}`}>
              <input
                id="vehicle_number"
                type="text"
                name="vehicle_number"
                value={vehicle_number}
                onChange={handleChange}
                required
                className={`w-full p-2 outline-none bg-transparent ${inputText}`}
              />
              <label
                htmlFor="vehicle_number"
                className={`absolute p-1 rounded-sm duration-100 left-4 
                group-focus-within:-top-3.5 group-focus-within:text-[10px] 
                group-focus-within:${labelBg.replace(" ", " group-focus-within:")}
                ${vehicle_number ? "-top-3.5 text-[10px] " + labelBg : ""}`}
              >
                Vehicle Number
              </label>
            </div>
          </div>

          {/* Model */}
          <div>
            <div className={`flex items-center h-10 border-b px-3 relative group focus-within:border focus-within:rounded-lg ${model ? "border rounded-lg" : ""}`}>
              <input
                id="model"
                type="text"
                name="model"
                value={model}
                onChange={handleChange}
                required
                className={`w-full p-2 outline-none bg-transparent ${inputText}`}
              />
              <label
                htmlFor="model"
                className={`absolute p-1 rounded-sm duration-100 left-4 
                group-focus-within:-top-3.5 group-focus-within:text-[10px] 
                group-focus-within:${labelBg.replace(" ", " group-focus-within:")}
                ${model ? "-top-3.5 text-[10px] " + labelBg : ""}`}
              >
                Model
              </label>
            </div>
          </div>

          {/* Fuel Type */}
          <div>
            <div className={`flex items-center h-10 border-b px-3 relative group focus-within:border focus-within:rounded-lg ${fuel_type ? "border rounded-lg" : ""}`}>
              <select
                id="fuel_type"
                name="fuel_type"
                value={fuel_type}
                onChange={handleChange}
                required
                className={`w-full p-2 outline-none bg-transparent ${inputText}`}
              >
                <option value="" hidden />
                <option>Petrol</option>
                <option>Diesel</option>
                <option>CNG</option>
                <option>Electric</option>
              </select>
              <label
                htmlFor="fuel_type"
                className={`absolute p-1 rounded-sm duration-100 left-4 
                group-focus-within:-top-3.5 group-focus-within:text-[10px] 
                group-focus-within:${labelBg.replace(" ", " group-focus-within:")}
                ${fuel_type ? "-top-3.5 text-[10px] " + labelBg : ""}`}
              >
                Fuel Type
              </label>
            </div>
          </div>

          {/* Last Service Date */}
          <div>
            <div className={`flex items-center h-10 border-b px-3 relative group focus-within:border focus-within:rounded-lg ${last_service_date ? "border rounded-lg" : ""}`}>
              <input
                id="last_service_date"
                type="date"
                name="last_service_date"
                value={last_service_date}
                onChange={handleChange}
                required
                className={`w-full p-2 outline-none bg-transparent ${inputText}`}
              />
              <label
                htmlFor="last_service_date"
                className={`absolute p-1 rounded-sm duration-100 left-4 
                group-focus-within:-top-3.5 group-focus-within:text-[10px] 
                group-focus-within:${labelBg.replace(" ", " group-focus-within:")}
                ${last_service_date ? "-top-3.5 text-[10px] " + labelBg : ""}`}
              >
                Last Service Date
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition p-2 rounded-lg font-semibold"
          >
            {loading ? "Saving..." : "Save Vehicle"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateVehicle
