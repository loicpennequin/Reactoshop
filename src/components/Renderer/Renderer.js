import React from 'react';
import { useStore } from './../../store';
import Sketch from './Sketch';
import LayersManager from './LayersManager';
import ToolBar from './ToolBar';

import css from './style.module.scss';

const Renderer = () => {
    const { state } = useStore();

    return (
        <div className={css.rendererWrapper}>
            {!state.isFileOpen ? (
                <div className={css.noFile}>
                    <p>Please open a file</p>
                </div>
            ) : (
                <>
                    <div className={css.layersManagerWrapper}>
                        <LayersManager />
                    </div>
                    <div className={css.toolBarWrapper}>
                        <ToolBar />
                    </div>
                    <Sketch />
                </>
            )}
        </div>
    );
};

export default Renderer;
