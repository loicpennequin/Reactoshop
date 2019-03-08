const canvasReducer = {
    initialState: {
        lastUpdated: new Date().getTime()
    },
    reducer(state, { type, payload }) {
        switch (type) {
            case 'UPDATE_CANVAS':
                return {
                    ...state,
                    lastUpdated: payload.timestamp
                };
            default:
                return state;
        }
    }
};

export default canvasReducer;
