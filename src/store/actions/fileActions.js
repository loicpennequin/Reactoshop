const fileActions = dispatch => ({
    openFile : file => dispatch({
        type: 'OPEN_FILE',
        payload: { file }
    })
});

export default fileActions;
