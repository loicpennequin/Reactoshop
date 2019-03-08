import uuid from 'uuid';

function createLayer({ onUpdate }) {
    return {
        id: uuid(),
        blendMode: 'BLEND',
        opacity: 100,
        steps: [],
        lastUpdated: new Date().getTime(),
        getTimestamp() {
            return new Date().getTime();
        },
        addStep(layerConfig) {
            this.prevsteps = [...this.steps];
            this.steps = [...this.steps, layerConfig];
            this.lastUpdated = this.getTimestamp();
            onUpdate(this.lastUpdated);
            return this;
        },
        update(newState) {
            Object.assign(this, newState);
            onUpdate(this.getTimestamp());
            return this;
        }
    };
}

export default createLayer;
