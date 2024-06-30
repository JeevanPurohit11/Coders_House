import { useState } from "react"
import { useStateWithCallBack } from "./useStateWithCallback";

export const useWebRTC=()=>{
    //we have to create a custom hook useStateWithCallBack , beacuse here useEffect will not work, and we inside callback will work after this useState client is updated our below useState will replace with useStateWithCallback.  
    const [clients,setClients]=useStateWithCallBack([
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