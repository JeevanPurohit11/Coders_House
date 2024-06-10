//here we maintain all our URL call to backend , if we require to change we can do it easily
//we have to make instance of axios here to work/use it as intersepter
import axios from 'axios';

//creating instance
const api=axios.create({
    BASE_URL : process.env.REACT_APP_API_URL,
    Headers : {
        'Content-type' : 'application/json',
         Accept : 'application/json'
    },
    //http://localhost:5500/api/send-otp;
})

//list of all end points
export const sendOtp = (data) => api.post('/api/send-otp',data); 


export default api; 