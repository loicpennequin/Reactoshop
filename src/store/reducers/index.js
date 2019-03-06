import fileReducer from './fileReducer.js';
import canvasReducer from './canvasReducer.js';
import layerReducer from './layerReducer.js';
import toolbarReducer from './toolbarReducer.js';

const initialState = {
    ...fileReducer.initialState,
    ...canvasReducer.initialState,
    ...layerReducer.initialState,
    ...toolbarReducer.initialState
};

const reducers = [
    fileReducer.reducer,
    canvasReducer.reducer,
    layerReducer.reducer,
    toolbarReducer.reducer
];

const rootReducer = (state, action) => {
    const newState = reducers.reduce(
        (newState, currentReducer) => currentReducer(newState, action),
        state
    );
    return newState;
};

export { initialState, rootReducer };
