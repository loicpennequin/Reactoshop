import React from 'react';
import { useStore } from './../../../store';
import LayerInfo from './LayerInfo';
import LayerConfig from './LayerConfig';
const LayersManager = () => {
    const { state, actions } = useStore();
    const createLayer = () => {
        actions.addLayer({
            onUpdate: actions.updateCanvas
        });
    };

    return (
        <>
            {state.selectedLayer !== -1 && <LayerConfig />}
            <div>
                {state.layers.map(layer => (
                    <LayerInfo key={layer.id} layer={layer} />
                ))}
            </div>
            <button onClick={createLayer}>New Layer</button>
        </>
    );
};

export default LayersManager;
