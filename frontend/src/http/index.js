//here we maintain all our URL call to backend , if we require to change we can do it easily
//we have to make instance of axios here to work/use it as intersepter
import axios from 'axios';


//creating instance  // wthCredentials enable to send cookie with ressponse 
const api=axios.create({
    baseURL : process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers : {
        'Content-type' : 'application/json',
         Accept : 'application/json'
    },
   
})

//list of all end points
export const sendOtp = (data) => api.post('/api/send-otp',data); 
export const verifyOtp =(data)=> api.post('/api/verify-otp',data);

export default api; 