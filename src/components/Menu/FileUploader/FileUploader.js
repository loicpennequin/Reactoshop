import React from 'react';
import { withFormik } from 'formik';
import { useStore } from './../../../store';

const FileUploader = ({ setFieldValue }) => {
    const { actions } = useStore();
    const onChange = async event => {
        const file = event.currentTarget.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => actions.openFile(reader.result);
        reader.onerror = () => console.log('somethign went wrong');
    };

    return (
        <form>
            <input id="file" name="file" type="file" onChange={onChange} />
        </form>
    );
};

export default withFormik({})(FileUploader);
