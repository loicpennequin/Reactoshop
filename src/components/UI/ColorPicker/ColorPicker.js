import React from 'react';
import css from './style.module.scss';

const ColorPicker = ({
    values,
    onChange,
    names={
        red: 'red',
        green: 'green',
        blue: 'blue',
        alpha: 'alpha'}
}) => {
    const previewStyle = () => ({
        '--red' : values.red,
        '--green' : values.green,
        '--blue' : values.blue,
        '--alpha' : values.alpha,
    });
    return (
        <>
            <label>Red</label>
            <input
                type="range"
                name={names.red}
                min="0"
                max="255"
                step="1"
                value={values.red}
                onChange={onChange}
            />{values.red}
            <br />
            <label>Green</label>
            <input
                type="range"
                name={names.green}
                min="0"
                max="255"
                step="1"
                value={values.green}
                onChange={onChange}
            />{values.green}
            <br />
            <label>Blue</label>
            <input
                type="range"
                name={names.blue}
                min="0"
                max="255"
                step="1"
                value={values.blue}
                onChange={onChange}
            />{values.blue}
            <br />
            <label>Alpha</label>
            <input
                type="range"
                name={names.alpha}
                min="0"
                max="100"
                step="1"
                value={values.alpha}
                onChange={onChange}
            />{values.alpha}
            <br/>
            <div className={css.preview} style={previewStyle()}/>
        </>
    );
}
export default ColorPicker;
