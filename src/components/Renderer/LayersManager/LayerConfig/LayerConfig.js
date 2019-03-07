import React from 'react';
import { useStore } from './../../../../store';
import blendModes from './_blendModes.js';

const LayerConfig = ({ handleSubmit }) => {
    const { state, actions } = useStore();
    const activeLayer = state.layers.find(
        layer => layer.id === state.selectedLayer
    );

    const handleChange = e => {
        activeLayer.update({ [e.target.name]: e.target.value });
        // actions.updateCanvas();
    };

    return (
        <div>
            <div>
                <label>Opacity</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    onChange={handleChange}
                    name="opacity"
                    value={activeLayer.opacity}
                />
            </div>
            <div>
                <label>Blend Mode</label>
                <select
                    onChange={handleChange}
                    value={activeLayer.blendMode}
                    name="blendMode"
                >
                    {blendModes.map(b => (
                        <option key={b.value} value={b.value}>
                            {b.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default LayerConfig;
