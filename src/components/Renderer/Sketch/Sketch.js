import React, { useRef, useState, useEffect } from 'react';
import p5 from 'p5';
import sketch from './_sketch.js';
import { useStore } from './../../../store';
import css from './style.module.scss';

const Sketch = () => {
    const wrapper = useRef(null);
    const [scale, setScale] = useState(1);
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

    const handleWheel = e => {
        let newScale = scale + (e.deltaY > 0 ? 0.1 : -0.1);
        if (newScale <= 0.1) newScale = 0.1;
        setScale(newScale);
    };

    return (
        <div className={css.sketchContainer} onWheel={handleWheel}>
            <div ref={wrapper} style={{ transform: `scale(${scale})` }} />
        </div>
    );
};

export default Sketch;
