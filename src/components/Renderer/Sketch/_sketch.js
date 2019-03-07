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
            p.colorMode(p.HSB, 360, 100, 100);
            const _imageCopy = _image.get();
            _imageCopy.loadPixels();
            for (let x = 0; x < _imageCopy.width; x++) {
                for (let y = 0; y < _imageCopy.height; y++) {
                    const oldColor = p.color(_imageCopy.get(x, y));
                    let h, s, b;
                    h = p.hue(oldColor);
                    s = p.saturation(oldColor);
                    b = p.brightness(oldColor);
                    b += newSettings.brightness;
                    _imageCopy.set(x, y, p.color(h, s, b));
                }
            }
            _imageCopy.updatePixels();
            _currentSettings = { ...newSettings };
            return _imageCopy;
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
};

export default sketch;
