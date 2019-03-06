const canvasActions = dispatch => ({
    updateCanvas: () => {
        dispatch({ type: 'UPDATE_CANVAS' });
    }
});

export default canvasActions;
