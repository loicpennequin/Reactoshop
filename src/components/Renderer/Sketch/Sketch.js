import React, { useRef, useState, useEffect } from 'react';
import p5 from 'p5';
import sketch from './p5Sketch.js';
import useSketch from './useSketch.js';
import { useStore } from './../../../store';

const Sketch = () => {
    const wrapper =  useRef(null);
    const [canvas, setCanvas] = useState(null);
    const p5Sketch = useSketch(sketch)
    const {state, actions} = useStore();

    useEffect(() => {
        setCanvas(new p5(p5Sketch, wrapper.current));

        return () => {
            canvas.remove();
            setCanvas(null);
        }
    }, []);

    return (
        <>
            <button onClick={() => actions.changeColor()}>change color (current: ({state.color}))</button>
            <div ref={wrapper}></div>
        </>
    );
}

export default Sketch;
