import { useState, useRef, useEffect, useCallback } from 'react';
export const useStateWithCallback = (intialState) => {
    const [state, setState] = useState(intialState);
    const cbRef = useRef(null);  //we are using cbRef when we not what to render our page on state change.

    const updateState = useCallback((newState, cb) => {
        cbRef.current = cb; //just storing the callback

        setState((prev) =>
            typeof newState === 'function' ? newState(prev) : newState
        );
    }, []);

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null;
        }
    }, [state]);

    return [state, updateState];
};