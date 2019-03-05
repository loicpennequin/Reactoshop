const fileReducer = {
    initialState : {
        isFileOpen : false,
        openedFile: null
    },
    reducer(state, {type, payload}) {
        switch (type) {
            case 'OPEN_FILE':
                return {
                    ...state,
                    isFileOpen: true,
                    openedFile: payload.file
                };
            case 'CLOSE_FILE':
                return {
                    ...state,
                    isFileOpen: false,
                };
            default:
                return state;
        }
    }
};

export default fileReducer;
