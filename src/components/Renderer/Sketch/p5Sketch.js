const sketch = (state, actions) => p => {

    p.setup = function () {
        p.createCanvas(600, 400);
        p.frameRate(1)
    };

    p.draw = function () {
        console.log(state().color);
        p.background(state().color);
    }
};

export default sketch;
