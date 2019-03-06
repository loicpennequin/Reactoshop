import createLayer from './../../services/layerFactory.js';

const layerActions = dispatch => ({
    addLayer: () => {
        dispatch({ type: 'ADD_LAYER', payload: { layer: createLayer() } });
    },
    deleteLayer: id => {
        dispatch({ type: 'DELETE_LAYER', payload: { id } });
    },
    selectLayer: id => {
        dispatch({ type: 'SELECT_LAYER', payload: { id } });
    }
});

export default layerActions;
