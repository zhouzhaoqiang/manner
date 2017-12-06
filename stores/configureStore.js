import { createStore,compose,applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import Localstorage from "./localstorage";
const { read,write } = Localstorage("react-starter");


export default function configureStore(initialState){
	//const store = createStore(rootReducer, initialState);
	const store = compose( applyMiddleware(write) )(createStore)(rootReducer, read()||initialState);
	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers');
			store.replaceReducer(nextReducer);
		});
	}
	return store;
}
