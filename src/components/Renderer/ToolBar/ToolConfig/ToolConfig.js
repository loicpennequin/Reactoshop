import React from 'react';
import { useStore } from './../../../../store';
import FillTool from './FillTool';

const ToolConfig = () => {
    const { state, actions } = useStore();

    const toolsMap = {
        fill: FillTool,
        gradient: () => <p>Soon..</p>
    };

    const Component = toolsMap[state.openedTool];

    return (
        <div>
            {state.selectedLayer !== -1 ? (
                <>
                    <Component />
                    <button onClick={actions.closeTool}>X</button>
                </>
            ) : (
                <p>Please select a layer first.</p>
            )}
        </div>
    );
};

export default ToolConfig;
