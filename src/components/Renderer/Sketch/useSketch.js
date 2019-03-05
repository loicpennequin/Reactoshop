import { useStore } from './../../../store';

const useSketch = sketch => {
    const { state, actions } = useStore();
    const getState = () => state;
    const getActions = () => actions

    return sketch(getState, getActions);
}

export default useSketch;
