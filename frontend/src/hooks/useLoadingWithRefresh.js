// useLoadingWithRefresh custom React hook :
// Purpose: This hook is designed to handle the process of re-authenticating a user when the page is refreshed. 
//It ensures that the user's authentication status is maintained by fetching the latest authentication data from the server and updating the Redux store accordingly.
//useEffect handles side effects such as data fetching.
//axios is a library for making HTTP request

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../Store/authSlice';
//when we do refresh our data are again getting set on redux store .
export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState(true); //true to indicate that the authentication check is in progress
    const dispatch = useDispatch();//dispatch data from store
    useEffect(() => {            // react hook help for auto login when we refresh our page
        (async () => {
            try {
                const { data } = await axios.get(                   //axios help to automatically request this url,with credentials true to send cookies also
                    'http://localhost:5500/api/refresh',
                    {
                        withCredentials: true,
                    }
                );
                dispatch(setAuth(data));   //Update Redux store with new authentication data
                setLoading(false);         //  Set loading to false after successful data fetch
            } catch (err) {
                console.log(err);
                setLoading(false);    //if we receive any error still it get false
            }
        })();
    }, []); //empty dependency array [] runs the side effect only once after the component mounts.

    return { loading };
}