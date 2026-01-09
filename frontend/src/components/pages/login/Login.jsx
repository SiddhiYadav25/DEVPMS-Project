import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaLockOpen } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slice/slice';
import { useNavigate } from 'react-router-dom';

const Login = ({seeLogin,setSeeLogin}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // console.log(seeLogin);
  const navigate=useNavigate()
  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  // const [seeLogin, setSeeLogin] = useState(false);



  const handleChange = (e) => {
    let {name,value} =e.target
    setFormData({ ...formData, [name]: value });
    // setSeeLogin(true)
  };

  
console.log(loading);


  const handelClickSeeLogin=(e)=>{

    setSeeLogin(!seeLogin)
  }

  const handleSubmit = (e) => {
    e.preventDefault();



    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        toast.success("Login successful")
        navigate("/home")
      })
      .catch((err) => toast.error(err));
  };
  return (
      <div className="absolute inset-0 bg-white text-gray-800 p-8 rounded-xl shadow-lg backface-hidden overflow-y-scroll">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                  Login Account
                </h2>
        
                <form onSubmit={handleSubmit} className="space-y-4">
        
                 
                  {/* Email */}
                  <div>
                    <div className={`flex items-center h-10 border-b px-3 relative group focus-within:border focus-within:rounded-lg ${formData.email?"border rounded-lg":""}`}>
                      <input
                      id="lemail"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent p-2 outline-none"
                      />
                      <FaEnvelope className="text-gray-400" />
                    <label htmlFor="lemail" className={`absolute p-1 rounded-sm duration-100 left-4 group-focus-within:-top-3.5 group-focus-within:text-[10px] group-focus-within:bg-white group-focus-within:text-black ${formData.email?"-top-3.5 text-[10px] bg-white text-black":""}`}>Email</label>
                    </div>
                  </div>
        
                  {/* Password */}
                  <div>
                    <div className={`flex items-center h-10 border-b px-3 relative group focus-within:border focus-within:rounded-lg ${formData.password?"border rounded-lg":""}`}>
                      <input
                      id="lpassword"
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
                   
                    <label htmlFor="lpassword" className={`absolute p-1 rounded-sm duration-100 left-4 group-focus-within:-top-3.5 group-focus-within:text-[10px] group-focus-within:bg-white group-focus-within:text-black ${formData.password?"-top-3.5 text-[10px] bg-white text-black":""}`}>Password</label>
        
                    </div>

                  </div>
        
        
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition p-2 rounded-lg font-semibold disabled:opacity-50"
                  >
                    {loading ? "Login..." : "Login"}
                  </button>
                </form>
        
                <p className="text-center text-sm text-gray-500 mt-4">
                  Already have an account?{" "}
                  <span className="text-indigo-600 cursor-pointer hover:underline" onClick={handelClickSeeLogin}>
                    Register
                  </span>
                </p>
              </div>

  )
}

export default Login