import { useState } from "react"
//we have to create a custom hook useStateWithCallBack , beacuse here useEffect will not work, as we have to do 
export const useWebRTC=()=>{
    const [clients,setClients]=useState([
        {
            id:1,
            name : 'Rakesh Rajpurohit',
        },
        {
            id:2,
            name : 'Bhavesh Rajpurohit',
        },

    ]);
    return {clients};

}