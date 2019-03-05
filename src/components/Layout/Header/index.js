import React from 'react';
import FileUploader from './../../Menu/FileUploader/index.js';
import css from './style.module.scss';

const Header = () => (
    <header className={css.header}>
        <FileUploader />
    </header>
);

export default Header;
