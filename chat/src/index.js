import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import handleNewMessage from './sagas';
import setupSocket from './sockets';
import username from './utils/name';

import {Provider} from 'react-redux';
import {addUser} from './actions';
import chat from './reducers';

const sagaMiddleware = createSagaMiddleware()


const store = createStore(reducers,
	applyMiddleware(sagaMiddleware));

const socket = setupSocket(store.dispatch, username)
sagaMiddleware.run(handleNewMessage, {socket, username})

store.dispatch(addUser('Me'));


ReactDOM.render(
	<Provider store = {store}>
		<App />
	</Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
