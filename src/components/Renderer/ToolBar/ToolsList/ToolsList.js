import React from 'react';
import { useStore } from './../../../../store';

const ToolsList = () => {
    const { actions } = useStore();

    return (
        <ul>
            <li>
                <button onClick={() => actions.openTool('fill')}>Fill</button>
            </li>
            <li>
                <button onClick={() => actions.openTool('gradient')}>
                    Gradient
                </button>
            </li>
        </ul>
    );
};

export default ToolsList;
