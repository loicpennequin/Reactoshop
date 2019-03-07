import React from 'react';
import { withFormik } from 'formik';
import { useStore } from './../../../../../store';
import ColorPicker from './../../../../UI/ColorPicker';

const GradientTool = ({ handleSubmit, handleChange, values }) => {
    const { state, actions } = useStore();
    const onSubmit = e => {
        handleSubmit(e);
        const activeLayer = state.layers.find(
            layer => layer.id === state.selectedLayer
        );
        activeLayer.addStep({
            ...values,
            type: 'GRADIENT'
        });
    };
    return (
        <form onSubmit={e => onSubmit(e)} style={{ backgroundColor: 'white' }}>
            <label>Direction</label>
            <br />
            <select
                value={values.direction}
                onChange={handleChange}
                name="direction"
            >
                <option value="VERTICAL">Vertical</option>
                <option value="HORIZONTAL">Horizontal</option>
                <option value="DIAGONAL">Diagonal</option>
                <option value="CUSTOM">Custom Angle</option>
            </select>
            <br />
            {values.direction === 'CUSTOM' && (
                <>
                    <label style={{ fontWeight: 'bold' }}>Angle</label>
                    <br />
                    <input
                        type="range"
                        min="0"
                        max="360"
                        step="1"
                        name="angle"
                        value={values.angle}
                        onChange={handleChange}
                    />
                    {values.angle + '°'}
                    <br />
                </>
            )}
            <label style={{ fontWeight: 'bold' }}>From</label>
            <br />
            <ColorPicker
                onChange={handleChange}
                values={values.from}
                names={{
                    red: 'from.red',
                    green: 'from.green',
                    blue: 'from.blue',
                    alpha: 'from.alpha'
                }}
            />
            <br />
            <label style={{ fontWeight: 'bold' }}>To</label>
            <br />
            <ColorPicker
                onChange={handleChange}
                values={values.to}
                names={{
                    red: 'to.red',
                    green: 'to.green',
                    blue: 'to.blue',
                    alpha: 'to.alpha'
                }}
            />
            <br />
            <input type="submit" />
        </form>
    );
};
export default withFormik({
    mapPropsToValues: () => ({
        from: {
            red: 255,
            green: 0,
            blue: 0,
            alpha: 100
        },
        to: {
            red: 0,
            green: 0,
            blue: 255,
            alpha: 100
        },
        direction: 'VERTICAL',
        angle: 0
    }),
    handleSubmit: values => {}
})(GradientTool);
