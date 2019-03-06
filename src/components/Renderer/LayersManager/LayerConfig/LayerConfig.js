import React from 'react';
import { useStore } from './../../../../store';
import blendModes from './_blendModes.js';

const LayerConfig = ({ handleSubmit }) => {
    const { state, actions } = useStore();
    const activeLayer = state.layers.find(
        layer => layer.id === state.selectedLayer
    );

    const onBlendModeChange = e => {
        activeLayer.blendMode = e.target.value;
        actions.updateCanvas();
    };

    const onOpacityChange = e => {
        activeLayer.opacity = e.target.value;
        actions.updateCanvas();
    };

    return (
        <div>
            <label>Opacity</label>
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                onChange={onOpacityChange}
                value={activeLayer.opacity}
            />
            <label>Blend Mode</label>
            <select onChange={onBlendModeChange} value={activeLayer.blendMode}>
                {blendModes.map(b => (
                    <option key={b.value} value={b.value}>
                        {b.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LayerConfig;
