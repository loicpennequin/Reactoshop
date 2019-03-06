const toolbarReducer = {
    initialState: {
        showToolbarConfig: false,
        openedTool: ''
    },
    reducer(state, { type, payload }) {
        switch (type) {
            case 'OPEN_TOOL':
                return {
                    ...state,
                    openedTool: payload.tool,
                    showToolbarConfig: true
                };
            case 'CLOSE_TOOL':
                return {
                    ...state,
                    showToolbarConfig: false
                };
            default:
                return state;
        }
    }
};

export default toolbarReducer;
