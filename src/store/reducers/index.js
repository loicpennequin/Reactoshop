import fileReducer from './fileReducer.js';
import canvasReducer from './canvasReducer.js';

const initialState = {
    ...fileReducer.initialState,
    ...canvasReducer.initialState
}

const reducers = [ fileReducer.reducer, canvasReducer.reducer ]

const rootReducer = (state, action) => {
    const newState = reducers.reduce((newState, currentReducer) => currentReducer(newState, action), state);
    return newState;
}


export {
    initialState, rootReducer
}
