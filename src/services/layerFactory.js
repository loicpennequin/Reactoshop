import uuid from 'uuid';

function createLayer() {
    return {
        id: uuid(),
        blendMode: 'BLEND',
        steps: [],
        addStep(layerConfig) {
            this.prevsteps = [...this.steps];
            this.steps = [...this.steps, layerConfig];
            return this;
        }
    };
}

export default createLayer;
