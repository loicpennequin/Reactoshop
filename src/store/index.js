import React, { useReducer, createContext, useContext } from 'react';
import { initialState, rootReducer } from './reducers';
import actions from './actions';

const StoreContext = createContext();

let _dispatch;

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    _dispatch = dispatch;

    return (
        <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
    );
};

const useStore = (mapStore = state => state) => {
    const state = useContext(StoreContext);
    return {
        state: mapStore(state),
        actions: actions.reduce(
            (acc, current) => ({
                ...acc,
                ...current(_dispatch)
            }),
            {}
        )
    };
};

export { StoreProvider, useStore };
