const canvasActions = dispatch => ({
    updateCanvas: timestamp => {
        dispatch({ type: 'UPDATE_CANVAS', payload: { timestamp } });
    }
});

export default canvasActions;
