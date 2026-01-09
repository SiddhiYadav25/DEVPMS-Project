import axios from "axios";


const BASEURL="http://localhost:5000/api"
const AxiosInstance=axios.create({
    baseURL:BASEURL
})



export default AxiosInstance