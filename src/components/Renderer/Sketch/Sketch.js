import React, { useRef, useState, useEffect } from 'react';
import p5 from 'p5';
import sketch from './_sketch.js';
import { useStore } from './../../../store';
import css from './style.module.scss';

const Sketch = () => {
    const wrapper = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const { state, actions } = useStore();

    useEffect(() => {
        const w = wrapper.current;
        setCanvas(new p5(sketch(w.offsetWidth, w.offsetHeight), w));
        actions.updateCanvas();
    }, []);

    useEffect(
        () => {
            if (canvas) {
                canvas.props = state;
                canvas.actions = actions;
                canvas.render();
            }
        },
        [state.lastUpdated]
    );

    return (
        <div className={css.sketchContainer}>
            <div ref={wrapper} />
        </div>
    );
};

export default Sketch;
