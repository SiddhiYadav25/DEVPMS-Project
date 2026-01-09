import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import DashBoard from "../pages/home/dashboard/DashBoard";
import CreateVehicle from "../pages/home/createVehicle/CreateVehicle";
import CreateTrip from "../pages/home/createTrip/CreateTrip";
import Trips from "../pages/home/trips/Trips";
import AllTrips from "../pages/home/allTrips/AllTrips";
import AllUsers from "../pages/home/allusers/AllUsers";
import AllVehicle from "../pages/home/allVehicle/AllVehicle";
import PrivateRoute from "./privateRoutes/PrivateRoutes";

const routes=createBrowserRouter([
    {
        path:"/",
        element:<Register></Register>
    },{
        path:"/login",
        element:<Login></Login>
    },{
        path:"/home",
        element:<PrivateRoute><Home></Home></PrivateRoute>,
        children:[
            {
                path:"dashboard",
                element:<DashBoard></DashBoard>
            },{
                index:true,
                element:<CreateVehicle></CreateVehicle>
            },{
                path:"create-trip",
                element:<CreateTrip></CreateTrip>
            },{
                path:"trips",
                element:<Trips></Trips>
            },{
                path:"all-trips",
                element:<AllTrips></AllTrips>
            },{
                path:"all-users",
                element:<AllUsers></AllUsers>
            },{
                path:"all-vehicles",
                element:<AllVehicle></AllVehicle>
            }
        ]
    }
])


export default routes