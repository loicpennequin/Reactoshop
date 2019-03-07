let _settings = {
    brightness: 0,
    hue: 0,
    saturation: 0
};

export default {
    getSettings() {
        return _settings;
    },
    updateSettings(newSettings) {
        _settings = { ..._settings, ...newSettings };
    }
};
