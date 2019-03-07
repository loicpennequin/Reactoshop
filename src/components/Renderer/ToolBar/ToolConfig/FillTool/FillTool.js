import React from 'react';
import { withFormik } from 'formik';
import { useStore } from './../../../../../store';
import ColorPicker from './../../../../UI/ColorPicker';

const FillTool = ({ handleSubmit, handleChange, values }) => {
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
    };
    return (
        <form onSubmit={e => onSubmit(e)} style={{ backgroundColor: 'white' }}>
            <ColorPicker onChange={handleChange} values={values} />
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
})(FillTool);
