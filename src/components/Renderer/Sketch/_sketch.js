import imageService from './../../../services/imageService.js';
import fileSaver from './../../../services/fileSaver.js';
import uuid from 'uuid';

const sketch = (wrapperWidth, wrapperHeight) => p => {
    let _imageLoaded = false;
    let _image;
    let _currentSettings;
    fileSaver.setSave(() => {
        p.saveCanvas(uuid(), 'png');
    });
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
                actions.updateCanvas(new Date().getTime());
            });
        } else {
            p.clear();
            p.noTint();
            p.image(applyImageSettings(), 0, 0);
            props.layers.forEach(layer => {
                if (!layer.renderer) {
                    layer.renderer = p.createGraphics(p.width, p.height);
                }
                if (props.lastUpdated === layer.lastUpdated) {
                    renderLayer(layer);
                }
                p.blendMode(p[layer.blendMode]);
                p.colorMode(p.RGB, 255, 255, 255, 100);
                p.tint(255, parseInt(layer.opacity, 10));
                p.image(layer.renderer, 0, 0);
            });
        }
    };

    function applyImageSettings() {
        // const newSettings = imageService.getSettings();
        // const shouldUpdate = Object.keys(newSettings).reduce(
        //     key => newSettings[key] === _currentSettings[key],
        //     false
        // );
        // if (shouldUpdate) {
        //     p.colorMode(p.HSB, 360, 100, 100);
        //     const _imageCopy = _image.get();
        //     _imageCopy.loadPixels();
        //     for (let x = 0; x < _imageCopy.width; x++) {
        //         for (let y = 0; y < _imageCopy.height; y++) {
        //             const oldColor = p.color(_imageCopy.get(x, y));
        //             let h, s, b;
        //             h = p.hue(oldColor);
        //             s = p.saturation(oldColor);
        //             b = p.brightness(oldColor);
        //             b += newSettings.brightness;
        //             _imageCopy.set(x, y, p.color(h, s, b));
        //         }
        //     }
        //     _imageCopy.updatePixels();
        //     _currentSettings = { ...newSettings };
        //     return _imageCopy;
        // } else {
        //     return _image;
        // }
        return _image;
    }

    function renderLayer(layer) {
        const newStep = layer.steps[layer.steps.length - 1];
        const renderer = layer.renderer;
        switch (newStep.type) {
            case 'FILL':
                renderFill(newStep, renderer);
                break;
            case 'GRADIENT':
                renderGradient(newStep, renderer);
                break;
            default:
                console.error('Unknown step type : ' + newStep.type);
        }
    }

    function renderFill({ red, green, blue, alpha }, renderer = p) {
        renderer.colorMode(renderer.RGB, 255, 255, 255, 100);
        renderer.fill(red, green, blue, alpha);
        renderer.noStroke();
        renderer.translate(0, 0);
        renderer.rect(0, 0, renderer.width, renderer.height);
    }

    function renderGradient(step, renderer = p) {
        renderer.colorMode(renderer.RGB, 255, 255, 255, 100);
        const startColor = renderer.color(Object.values(step.from));
        const endColor = renderer.color(Object.values(step.to));
        if (step.direction === 'VERTICAL') {
            for (let y = 0; y <= p.height; y++) {
                const inter = renderer.map(y, 0, renderer.height, 0, 1);
                const c = renderer.lerpColor(startColor, endColor, inter);
                renderer.noFill();
                renderer.stroke(
                    renderer.red(c),
                    renderer.green(c),
                    renderer.blue(c),
                    renderer.alpha(c)
                );
                renderer.strokeWeight(1);
                renderer.line(0, y, p.width, y);
            }
        } else if (step.direction === 'HORIZONTAL') {
            for (let x = 0; x <= renderer.width; x++) {
                const inter = renderer.map(x, 0, renderer.width, 0, 1);
                const c = renderer.lerpColor(startColor, endColor, inter);
                renderer.noFill();
                renderer.stroke(
                    renderer.red(c),
                    renderer.green(c),
                    renderer.blue(c),
                    renderer.alpha(c)
                );
                renderer.strokeWeight(1);
                renderer.line(x, 0, x, renderer.height);
            }
        } else if (step.direction === 'DIAGONAL') {
            const axis =
                renderer.width > renderer.height
                    ? renderer.width
                    : renderer.height;
            const diagonal = renderer.createVector(
                renderer.width,
                renderer.height
            );
            for (let y = -axis; y <= axis; y++) {
                const inter = renderer.map(y, -axis, axis, 0, 1);
                const c = renderer.lerpColor(startColor, endColor, inter);
                renderer.noFill();
                renderer.stroke(
                    renderer.red(c),
                    renderer.green(c),
                    renderer.blue(c),
                    renderer.alpha(c)
                );
                renderer.strokeWeight(2);
                renderer.line(0, y, diagonal.x, y + diagonal.y);
            }
        } else if (step.direction === 'CUSTOM') {
            const angle = renderer.radians(step.angle);
            const diagonal = renderer
                .createVector(renderer.width, renderer.height)
                .mag();
            renderer.push();
            renderer.translate(renderer.width / 2, renderer.height / 2);
            renderer.rotate(angle);
            renderer.translate(-p.width / 2, 0);
            renderer.stroke(0);
            for (let i = p.width - diagonal; i <= diagonal; i++) {
                const inter = renderer.map(i, 0, renderer.width, 0, 1);
                const c = renderer.lerpColor(startColor, endColor, inter);
                renderer.noFill();
                renderer.stroke(
                    renderer.red(c),
                    renderer.green(c),
                    renderer.blue(c),
                    renderer.alpha(c)
                );
                renderer.strokeWeight(2);
                renderer.line(i, -renderer.height, i, renderer.height);
            }
            renderer.pop();
        }
    }
};

export default sketch;
