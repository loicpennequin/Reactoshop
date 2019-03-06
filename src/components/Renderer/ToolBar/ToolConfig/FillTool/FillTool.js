import React from 'react';
import { withFormik } from 'formik';
import { useStore } from './../../../../../store';

const FillToll = ({ handleSubmit, handleChange, values }) => {
    const { state, actions } = useStore();
    const onSubmit = e => {
        handleSubmit(e);
        const activeLayer = state.layers.find(
            layer => layer.id === state.selectedLayer
        );
        activeLayer.addStep({
            ...values,
            type: 'FILL'
        });
        actions.updateCanvas();
    };
    return (
        <form onSubmit={e => onSubmit(e)} style={{ backgroundColor: 'white' }}>
            <label>Red</label>
            <input
                type="range"
                name="red"
                min="0"
                max="255"
                step="1"
                value={values.red}
                onChange={handleChange}
            />
            <br />
            <label>Green</label>
            <input
                type="range"
                name="green"
                min="0"
                max="255"
                step="1"
                value={values.green}
                onChange={handleChange}
            />
            <br />
            <label>Blue</label>
            <input
                type="range"
                name="blue"
                min="0"
                max="255"
                step="1"
                value={values.blue}
                onChange={handleChange}
            />
            <br />
            <label>Alpha</label>
            <input
                type="range"
                name="alpha"
                min="0"
                max="100"
                step="1"
                value={values.alpha}
                onChange={handleChange}
            />
            <br />
            <input type="submit" />
        </form>
    );
};
export default withFormik({
    mapPropsToValues: () => ({
        red: 0,
        green: 0,
        blue: 0,
        alpha: 100
    }),
    handleSubmit: values => {}
})(FillToll);
