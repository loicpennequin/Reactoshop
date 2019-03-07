import imageService from './../../../services/imageService.js';

const sketch = (wrapperWidth, wrapperHeight) => p => {
    let _imageLoaded = false;
    let _image;
    let _currentLayer;
    let _currentSettings;

    const getOpacity = opacity => (opacity * _currentLayer.opacity) / 100;

    p.setup = function() {
        p.createCanvas(wrapperWidth, wrapperHeight);
        p.frameRate(1);
        p.noLoop();
        p.pixelDensity(1);
        p.colorMode(p.RGB, 255, 255, 255, 100);
    };

    p.render = function() {
        const { props, actions } = p;
        if (!_imageLoaded) {
            _image = p.loadImage(props.openedFile, () => {
                _imageLoaded = true;
                _currentSettings = imageService.getSettings();
                p.resizeCanvas(_image.width, _image.height);
                actions.updateCanvas();
            });
        } else {
            p.clear();
            p.image(applyImageSettings(), 0, 0);
            props.layers.forEach(renderLayer);
        }
    };

    function applyImageSettings() {
        const newSettings = imageService.getSettings();
        const shouldUpdate = Object.keys(newSettings).reduce(
            key => newSettings[key] === _currentSettings[key],
            false
        );
        if (shouldUpdate) {
            // p.colorMode(p.HSB, 360, 100, 100);
            // const _imageCopy = _image.get();
            // _imageCopy.loadPixels();
            // for (let x = 0; x < _imageCopy.width; x++) {
            //     for (let y = 0; y < _imageCopy.height; y++) {
            //         const oldColor = p.color(_imageCopy.get(x, y));
            //         let h, s, b;
            //         h = p.hue(oldColor);
            //         s = p.saturation(oldColor);
            //         b = p.brightness(oldColor);
            //         b += newSettings.brightness;
            //         _imageCopy.set(x, y, p.color(h, s, b));
            //     }
            // }
            // _imageCopy.updatePixels();
            // _currentSettings = { ...newSettings };
            // return _imageCopy;
            return _image;
        } else {
            return _image;
        }
    }

    function renderLayer(layer) {
        p.blendMode(p[layer.blendMode]);
        _currentLayer = layer;
        layer.steps.forEach(step => {
            switch (step.type) {
                case 'FILL':
                    renderFill(step);
                    break;
                case 'GRADIENT':
                    renderGradient(step);
                    break;
                default:
                    console.error('Unknown step type : ' + step.type);
            }
        });
    }

    function renderFill({ red, green, blue, alpha }) {
        p.colorMode(p.RGB, 255, 255, 255, 100);
        p.fill(red, green, blue, getOpacity(alpha));
        p.noStroke();
        p.translate(0, 0);
        p.rect(0, 0, p.width, p.height);
    }

    function renderGradient(step){
        p.colorMode(p.RGB, 255, 255, 255, 100);
        const startColor = p.color(Object.values(step.from));
        const endColor = p.color(Object.values(step.to));
        if (step.direction === 'VERTICAL'){
            for (let y = 0 ; y <= p.height ; y++){
                const inter = p.map(y, 0,  p.height, 0, 1);
                const c = p.lerpColor(startColor, endColor, inter);
                p.noFill();
                p.stroke(
                    p.red(c),
                    p.green(c),
                    p.blue(c),
                    getOpacity(p.alpha(c))
                );
                p.strokeWeight(1);
                p.line(0, y, p.width, y);
            }
        } else if (step.direction === 'HORIZONTAL'){
            for (let x = 0 ; x <= p.width ; x++){
                const inter = p.map(x, 0,  p.width, 0, 1);
                const c = p.lerpColor(startColor, endColor, inter);
                p.noFill();
                p.stroke(
                    p.red(c),
                    p.green(c),
                    p.blue(c),
                    getOpacity(p.alpha(c))
                );
                p.strokeWeight(1);
                p.line(x, 0, x, p.height);
            }
        }
    }
};

export default sketch;
