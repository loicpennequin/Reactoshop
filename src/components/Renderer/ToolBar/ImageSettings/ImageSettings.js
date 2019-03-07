import React from 'react';
import { useStore } from './../../../../store';
import imageService from './../../../../services/imageService.js';

const ImageSettings = () => {
    const { state, actions } = useStore();

    const handleChange = e => {
        imageService.updateSettings({
            [e.target.name]: e.target.value
        });
        actions.updateCanvas();
    };

    return (
        <div>
            <div>
                <label>Brightness</label>
                <input
                    type="range"
                    min="-100"
                    max="100"
                    step="1"
                    name="brightness"
                    onChange={handleChange}
                    value={imageService.getSettings().brightness}
                />
            </div>
        </div>
    );
};

export default ImageSettings;
