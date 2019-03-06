import React from 'react';
import { useStore } from './../../../../store';
import css from './style.module.scss';

const LayerInfo = ({ layer }) => {
    const { state, actions } = useStore();
    const isSelected = state.selectedLayer === layer.id;

    return (
        <div
            className={`${css.wrapper} ${isSelected ? css.selected : ''}`}
            onClick={() => actions.selectLayer(layer.id)}
        >
            {layer.id}
            <button onClick={() => actions.deleteLayer(layer.id)}>X</button>
        </div>
    );
};

export default LayerInfo;
