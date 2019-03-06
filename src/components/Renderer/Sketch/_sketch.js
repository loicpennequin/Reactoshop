const sketch = (wrapperWidth, wrapperHeight) => p => {
    let _imageLoaded = false;
    let _image;
    p.setup = function() {
        p.createCanvas(wrapperWidth, wrapperHeight);
        p.frameRate(1);
        p.noLoop();
        p.colorMode(p.RGB, 255, 255, 255, 100);
    };

    p.render = function() {
        const { props, actions } = p;
        if (!_imageLoaded) {
            _image = p.loadImage(props.openedFile, () => {
                _imageLoaded = true;
                p.resizeCanvas(_image.width, _image.height);
                actions.updateCanvas();
            });
        } else {
            p.clear();
            p.background(255, 0, 0);
            p.image(_image, 0, 0);
            props.layers.forEach(renderLayer);
        }
    };

    function renderLayer(layer) {
        layer.steps.forEach(step => {
            switch (step.type) {
                case 'FILL':
                    renderFill(step);
                    break;
                default:
                    console.error('Unknown step type : ' + step.type);
            }
        });
    }

    function renderFill({ red, green, blue, alpha }) {
        p.fill(red, green, blue, alpha);
        p.noStroke();
        p.translate(0, 0);
        p.rect(0, 0, p.width, p.height);
    }
};

export default sketch;
