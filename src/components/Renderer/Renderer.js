import React, { useEffect } from 'react';
import { useStore } from './../../store';
import Sketch from './Sketch';

const Renderer = ({setFieldValue}) => {
    const { state, actions } = useStore();

    useEffect(() => {
        if (state.isFileOpen){
            actions.updateCanvas();
        }
    }, [state.isFileOpen]);

    return (
        <div>
            {state.isFileOpen
                ? <Sketch/>
                : <p>Please open a file</p>
            }
        </div>
    )
};

export default Renderer
