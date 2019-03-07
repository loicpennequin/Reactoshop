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
        actions.updateCanvas();
    };
    return (
        <form onSubmit={e => onSubmit(e)} style={{ backgroundColor: 'white' }}>
            <label>Direction</label>
            <br/>
            <select value={values.direction} onChange={handleChange} name="direction">
                <option value="VERTICAL">Vertical</option>
                <option value="HORIZONTAL">Horizontal</option>
            </select>
            <br/>
            <label style={{fontWeight: 'bold'}}>From</label>
            <br />
            <ColorPicker
                onChange={handleChange}
                values={values.from}
                names={{red: 'from.red', green: 'from.green', blue: 'from.blue', alpha: 'from.alpha'}}
            />
            <br />
            <label style={{fontWeight: 'bold'}}>To</label>
            <br />
            <ColorPicker
                onChange={handleChange}
                values={values.to}
                names={{red: 'to.red', green: 'to.green', blue: 'to.blue', alpha: 'to.alpha'}}
            />
            <br />
            <input type="submit" />
        </form>
    );
};
export default withFormik({
    mapPropsToValues: () => ({
        from : {
            red: 255,
            green: 0,
            blue: 0,
            alpha: 100
        },
        to :{
            red: 0,
            green: 0,
            blue: 255,
            alpha: 100
        },
        direction: 'VERTICAL'
    }),
    handleSubmit: values => {}
})(GradientTool);
