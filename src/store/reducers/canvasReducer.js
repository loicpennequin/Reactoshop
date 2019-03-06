const canvasReducer = {
    initialState: {
        lastUpdate: new Date().getTime()
    },
    reducer(state, { type, payload }) {
        switch (type) {
            case 'UPDATE_CANVAS':
                return {
                    ...state,
                    lastUpdate: new Date().getTime()
                };
            default:
                return state;
        }
    }
};

export default canvasReducer;
