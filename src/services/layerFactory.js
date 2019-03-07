import uuid from 'uuid';

function createLayer({ onUpdate }) {
    return {
        id: uuid(),
        blendMode: 'BLEND',
        opacity: 100,
        steps: [],
        lastUpdated: new Date().getTime(),
        addStep(layerConfig) {
            this.prevsteps = [...this.steps];
            this.steps = [...this.steps, layerConfig];
            this.lastUpdated = new Date().getTime();
            onUpdate();
            return this;
        },
        update(newState) {
            Object.assign(this, newState, {
                lastUpdated: new Date().getTime()
            });
            onUpdate();
            return this;
        }
    };
}

export default createLayer;
