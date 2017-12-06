import './scss/main.scss';
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router,browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { RouterConfig } from './routes';
import configureStore from './stores/configureStore';
const store = configureStore();

render(
	<Provider store={store}>
		<Router routes={RouterConfig} history={browserHistory}/>
	</Provider>,
	document.getElementById('root') 
);
