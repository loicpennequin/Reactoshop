const canvasActions = dispatch => ({
    updateCanvas : () => {
        dispatch({type: 'UPDATE_CANVAS_START'});
        setTimeout(() => {
            dispatch({type: 'UPDATE_CANVAS_END'});
        });
    },
    changeColor : () => dispatch({type: 'CHANGE_COLOR'}),
});

export default canvasActions;
