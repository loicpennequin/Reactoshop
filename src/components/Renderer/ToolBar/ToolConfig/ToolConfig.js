import React from 'react';
import { useStore } from './../../../../store';
import FillTool from './FillTool';
import GradientTool from './GradientTool';

const ToolConfig = () => {
    const { state, actions } = useStore();

    const toolsMap = {
        fill: FillTool,
        gradient: GradientTool
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
