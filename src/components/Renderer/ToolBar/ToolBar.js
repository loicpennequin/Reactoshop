import React from 'react';
import ToolConfig from './ToolConfig';
import ToolsList from './ToolsList';
import { useStore } from './../../../store';

const ToolBar = () => {
    const { state } = useStore();

    return (
        <div>
            <ToolsList />
            {state.showToolbarConfig && <ToolConfig />}
        </div>
    );
};

export default ToolBar;
