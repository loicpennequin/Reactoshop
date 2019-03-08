import React from 'react';
import FileUploader from './../../Menu/FileUploader/index.js';
import css from './style.module.scss';
import fileSaver from './../../../services/fileSaver.js';

const Header = () => (
    <header className={css.header}>
        <FileUploader />
        <button onClick={fileSaver.save}>Save File</button>
    </header>
);

export default Header;
