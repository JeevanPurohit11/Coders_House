import { useCallback,useRef, useEffect, useState } from "react"

export const useStateWithCallBack=(initialState)=>{
    const [state,setState]=useState(initialState);
    const cbRef= useRef();  //we are using cbRef when we not what to render our page on state change.

    const updateState =useCallback((newState,cb)=>{
        cbRef.current=cb; //just storing the callback
        
        setState((prev)=>{
            return typeof newState === 'function' ? newState(prev) : newState;
        });
    },[]);
    useEffect(()=>{
        if(cbRef.current){
            cbRef.current(state);
            cbRef.current=null;
        }
    },[state]);
    return [state,updateState];
}