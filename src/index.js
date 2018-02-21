import reducer from './reducers';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import './index.css';
import {Provider} from 'react-redux';
import  AppView from './App'

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <Provider store={store}>
        <AppView />
    </Provider>,
    document.getElementById("app")
);

