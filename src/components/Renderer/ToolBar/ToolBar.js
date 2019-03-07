import React from 'react';
import ToolConfig from './ToolConfig';
import ToolsList from './ToolsList';
// import ImageSettings from './ImageSettings';
import { useStore } from './../../../store';

const ToolBar = () => {
    const { state } = useStore();

    return (
        <div>
            {/* <ImageSettings /> */}
            <ToolsList />
            {state.showToolbarConfig && <ToolConfig />}
        </div>
    );
};

export default ToolBar;
