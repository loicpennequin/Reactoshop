import createLayer from './../../services/layerFactory.js';

const layerActions = dispatch => ({
    addLayer: layerDef => {
        dispatch({
            type: 'ADD_LAYER',
            payload: { layer: createLayer(layerDef) }
        });
    },
    deleteLayer: id => {
        dispatch({ type: 'DELETE_LAYER', payload: { id } });
    },
    selectLayer: id => {
        dispatch({ type: 'SELECT_LAYER', payload: { id } });
    }
});

export default layerActions;
