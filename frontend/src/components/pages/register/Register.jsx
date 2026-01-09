import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaEye,
  FaEyeSlash,
  FaLockOpen,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { registerUser } from "../../slice/slice";

import { validatePassword } from "val-pass"; 
import Login from "../login/Login";

const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [seeLogin, setSeeLogin] = useState(false);
    const [errorMessage,setErrorMessage]=useState("")
  const [isMatched,setIsMatched]=useState(true)


  const handleChange = (e) => {
    let {name,value} =e.target
    setFormData({ ...formData, [name]: value });

    if(name==="password"){
    let {validateAll,getAllValidationErrorMessage}=validatePassword(value,8)
    !validateAll()? setErrorMessage(getAllValidationErrorMessage()):setErrorMessage("")
    // errorMessage&&setErrorMessage("")
    !value&&setErrorMessage("")
    }
  };


  
  const handelCheckPass=(e)=>{
    let {name,value}=e.target
   value===formData.password?setIsMatched(true):setIsMatched(false) 
  //  value&&setIsMatched(true)
    value==""&&setIsMatched(true)
    setFormData((preVal)=>({...preVal,[name]:value}))
  }

  const handelClickSeeLogin=()=>{
    setSeeLogin(!seeLogin)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // const { valid, errors } = validatePassword(formData.password, 8);
    // if (!valid) {
    //   toast.error("Password must meet requirements");
    //   return;
    // }

    dispatch(registerUser(formData))
      .unwrap()
      .then(() => toast.success("Registration successful"))
      .catch((err) => toast.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 perspective-[1800px]">
        <div  className={`relative w-90 h-120 transform-3d duration-700 ${loading?"animate-wiggle":""}`}
  style={{ transform: seeLogin ? "rotateY(-180deg)" : "rotateY(0deg)" }}>


    <div className="absolute inset-0 bg-white shadow-2xl rounded-2xl backface-hidden"  style={{ transform: "translateZ(180px)" }}>
        
 <span className="text-indigo-600 cursor-pointer hover:underline" >
          <Login setSeeLogin={setSeeLogin} seeLogin={seeLogin}></Login>
          </span>
    </div>

      {/* left */}

      <div  className="absolute inset-0 bg-white shadow-2xl rounded-2xl backface-hidden"
    style={{ transform: "rotateY(90deg) translateZ(180px)" }}>
        <img src="https://cdn.vectorstock.com/i/500p/02/01/colorful-cartoon-semi-truck-vector-54310201.jpg" className="size-full" alt="" />
      </div>

      {/* back */}
      <div  className="absolute inset-0 bg-white shadow-2xl rounded-2xl backface-hidden"
  style={{ transform: "rotateY(180deg) translateZ(180px)" }}>
                      <div className="absolute inset-0 bg-white text-gray-800 p-8 rounded-xl shadow-lg backface-hidden overflow-y-scroll"
  style={{ transform: "translateZ(180px)" }}>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            {/* <label className="text-sm mb-1 block">Full Name</label> */}
            <div className={`flex items-center h-10 border-b px-3 relative group focus-within:border focus-within:rounded-lg ${formData.name?"border rounded-lg":""}`}>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent p-2 outline-none text-sm"
              />
              <FaUser className="text-gray-400" />
              <label htmlFor="name" className={`absolute p-1 rounded-sm duration-100 left-4 group-focus-within:-top-3.5 group-focus-within:text-[10px] group-focus-within:bg-white group-focus-within:text-black ${formData.name?"-top-3.5 text-[10px] bg-white text-black":""}`}>Name</label>
            </div>
          </div>

          {/* Email */}
          <div>
            <div className={`flex items-center h-10 border-b px-3 relative group focus-within:border focus-within:rounded-lg ${formData.email?"border rounded-lg":""}`}>
              <input
              id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent p-2 outline-none"
              />
              <FaEnvelope className="text-gray-400" />
            <label htmlFor="email" className={`absolute p-1 rounded-sm duration-100 left-4 group-focus-within:-top-3.5 group-focus-within:text-[10px] group-focus-within:bg-white group-focus-within:text-black ${formData.email?"-top-3.5 text-[10px] bg-white text-black":""}`}>Email</label>
            </div>
          </div>

          {/* Password */}
          <div>
            <div className={`flex items-center h-10 border-b px-3 relative group focus-within:border focus-within:rounded-lg ${formData.password?"border rounded-lg":""}`}>
              <input
              id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent p-2 outline-none"
              />
              {/* <FaLock className="text-gray-400" /> */}
                            <span
                className="ml-2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                 {!showPassword ? <FaLock className="text-gray-400" /> : <FaLockOpen  className="text-lime-700"/>}
              </span>
           
            <label htmlFor="password" className={`absolute p-1 rounded-sm duration-100 left-4 group-focus-within:-top-3.5 group-focus-within:text-[10px] group-focus-within:bg-white group-focus-within:text-black ${formData.password?"-top-3.5 text-[10px] bg-white text-black":""}`}>Password</label>

            </div>
            <span className={!errorMessage?'hidden':"block text-red-700 font-semibold"}>*{errorMessage&&errorMessage}</span>
          </div>

          {/* Confirm Password */}
          <div>
            <div className={`flex items-center  h-10 border-b  px-3 relative group focus-within:border focus-within:rounded-lg ${isMatched ?"border-black":"border-red-600"} ${formData.confirmPassword?"border rounded-lg":""}`}>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handelCheckPass}
                required
                className="w-full bg-transparent p-2 outline-none"
              />
              <FaLock className="text-gray-400" />
            <label htmlFor="confirmPassword" className={`absolute p-1 rounded-sm duration-100 left-4 group-focus-within:-top-3.5 group-focus-within:text-[10px] group-focus-within:bg-white group-focus-within:text-black ${formData.confirmPassword?"-top-3.5 text-[10px] bg-white text-black":""}`}>Confirm Password</label>
            </div>
          </div>

          {/* Role */}
          <div>
            <div className={`flex items-center h-10 border-b px-3 relative group focus-within:border focus-within:rounded-lg ${formData.role?"border rounded-lg":""}`}>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-transparent p-2 outline-none"
              >
                <option value="" selected disabled></option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="driver">Driver</option>
              </select>
              <FaUserShield className="text-gray-400" />
            <label htmlFor="role" className={`absolute p-1 rounded-sm duration-100 left-4 group-focus-within:-top-3.5 group-focus-within:text-[10px] group-focus-within:bg-white group-focus-within:text-black ${formData.role?"-top-3.5 text-[10px] bg-white text-black":""}`}>Role</label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition p-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span className="text-indigo-600 cursor-pointer hover:underline" onClick={handelClickSeeLogin}>
            Login
          </span>
        </p>
      </div>
                 
      </div>

            {/* right */}

      <div  className="absolute inset-0 bg-white shadow-2xl rounded-2xl backface-hidden"
    style={{ transform: "rotateY(270deg) translateZ(180px)" }}>
      <img src="https://cdn.vectorstock.com/i/500p/02/01/colorful-cartoon-semi-truck-vector-54310201.jpg" className="size-full" alt="" />
      </div>
        </div>
    </div>
  );
};

export default Register;
