const toolbarActions = dispatch => ({
    openTool: tool => {
        dispatch({ type: 'OPEN_TOOL', payload: { tool: tool } });
    },
    closeTool: () => {
        dispatch({ type: 'CLOSE_TOOL' });
    }
});

export default toolbarActions;
