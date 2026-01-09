import AxiosInstance from "../instance/axiosInstance"


const services={
    registerUser:async(payload)=>{
        let data =await AxiosInstance.post("/auth/register",payload)
        return data
    },
    loginUser:async(payload)=>{
        let data =await AxiosInstance.post("/auth/login",payload)
        return data
    },
        addVehicle:async(payload,token)=>{
        let data =await AxiosInstance.post("/vehicles",payload,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return data
    },
        addTrip:async(payload,token)=>{
        let data =await AxiosInstance.post("/trips",payload,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return data
    },
       
        allUser:async(token)=>{
            console.log(token);
            
        let data =await AxiosInstance.get("/users",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return data
    },
        allTrips:async(token)=>{
            console.log(token);
            
        let data =await AxiosInstance.get("/trips",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return data
    },
     tripsbyId:async(token,id)=>{
            // console.log(token);
            
        let data =await AxiosInstance.get(`/trips/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return data
    },
         getAllVehicles:async(token)=>{
            // console.log(token);
            
        let data =await AxiosInstance.get("/vehicles",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return data
    },
    getTripsPerDriver: async (token) => {
  const res = await AxiosInstance.get("/graphs/trips-per-driver", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
},

getFuelEfficiencyPerDriver: async (token) => {
  const res = await AxiosInstance.get("/graphs/fuel-efficiency-driver", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
},

getDistancePerDay: async (token) => {
  const res = await AxiosInstance.get("/graphs/distance-per-day", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
},

getFuelPerVehicle: async (token) => {
  const res = await AxiosInstance.get("/graphs/fuel-per-vehicle", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
},

getAvgSpeedPerDriver: async (token) => {
  const res = await AxiosInstance.get("/graphs/avg-speed-driver", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
},
}


export default services