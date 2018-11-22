//Основные модули
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { rootReducer } from "./store/reducers/rootReducer";

import App from './App';

import './index.css';

import * as serviceWorker from './serviceWorker';

// Подключение Redux
const initialState = {};
const store = createStore(rootReducer, initialState + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
