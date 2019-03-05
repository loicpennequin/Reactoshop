import React from 'react';
import { StoreProvider } from '../store'
import Header from './Layout/Header';
import Workspace from './Layout/Workspace';
import css from './App.module.scss';

const App = () => (
    <StoreProvider>
        <div className={css.app}>
            <Header />
            <Workspace />
        </div>
    </StoreProvider>
);

export default App;
