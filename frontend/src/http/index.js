import axios from 'axios';

//Creating axios instance with configuration
const api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
});

// List of all endpoints using the base URL from the axios instance

export const sendOtp = (data) => api.post('http://localhost:5500/api/send-otp', data);
export const verifyOtp = (data) => api.post('http://localhost:5500/api/verify-otp', data);
export const activate = (data) => api.post('http://localhost:5500/api/activate', data);
export const logout =()=> api.post('http://localhost:5500/api/logout');

//intercepter sit inbetween our each request(frontend) and response(backend) to server //react -axios magic 
//here we get a response object then we .use where we have to pass 2parameter 
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry      //is_retry should be false , beacuse if person refresh page many time then it will be goes into infinity loop, so in this case it will only check for one time
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    'http://localhost:5500/api/refresh',   // making refresh request to server
                    {
                        withCredentials: true,     //so our tokken will be send successfully
                    }
                );
                //if above try request was successfull then our new access and refresh token will be store in cokies .basically this call to endpoint will check on server have refresh token which was valid , then our new token will be save in cookies and new refesh token will be stored in DB 
                return api.request(originalRequest); //this is our original request which we have to make.
            } catch (err) {
                console.log(err.message);
            }
        }
          //if our response was not 401 then //  // If the response was not 401 or retry failed
        throw error;
    }
);
export default api;
