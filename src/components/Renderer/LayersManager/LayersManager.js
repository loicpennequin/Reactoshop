import React from 'react';
import { useStore } from './../../../store';
import LayerInfo from './LayerInfo';

const LayersManager = () => {
    const { state, actions } = useStore();
    const createLayer = () => {
        actions.addLayer();
    };

    return (
        <>
            {state.layers.map(layer => (
                <LayerInfo key={layer.id} layer={layer} />
            ))}
            <button onClick={createLayer}>New Layer</button>
        </>
    );
};

export default LayersManager;
