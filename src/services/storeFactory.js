import React, { useReducer } from 'react';

function createStore(initialState, reducer){
    const [state, dispatch] = useReducer(reducer, initialState);
    return [state, dispatch];
}

export default createStore;
