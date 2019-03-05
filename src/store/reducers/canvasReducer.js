const canvasReducer = {
    initialState : {
        canvasUpdating: false,
        color: 255
    },
    reducer(state, {type, payload}) {
        switch (type) {
            case 'UPDATE_CANVAS_START':
                return {
                    ...state,
                    canvasUpdating: true
                };
            case 'UPDATE_CANVAS_END':
                return {
                    ...state,
                    canvasUpdating: false,
                };
            case 'CHANGE_COLOR':
                return {
                    ...state,
                    color: state.color === 255 ? '0' : 255
                }
            default:
                return state
        }
    }
};

export default canvasReducer;
