let _save = () => {};

const fileSaver = {
    save: () => {
        _save();
    },
    setSave: fn => {
        _save = fn;
    }
};

export default fileSaver;
