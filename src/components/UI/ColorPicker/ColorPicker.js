import React from 'react';

const ColorPicker = ({
    values,
    onChange,
    names={
        red: 'red',
        green: 'green',
        blue: 'blue',
        alpha: 'alpha'}
}) => (
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
        />
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
        />
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
        />
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
        />

    </>
);

export default ColorPicker;
