const layerReducer = {
    initialState: {
        layers: [],
        selectedLayer: -1
    },
    reducer(state, { type, payload }) {
        switch (type) {
            case 'ADD_LAYER':
                return {
                    ...state,
                    layers: state.layers.concat(payload.layer),
                    selectedLayer: payload.layer.id
                };
            case 'DELETE_LAYER':
                const isSelected = state.selectedLayer === payload.id;
                return {
                    ...state,
                    layers: state.layers.filter(l => l.id !== payload.id),
                    selectedLayer: isSelected ? -1 : state.selectedLayer
                };
            case 'SELECT_LAYER':
                return {
                    ...state,
                    layers: state.layers,
                    selectedLayer: payload.id
                };
            default:
                return state;
        }
    }
};

export default layerReducer;
