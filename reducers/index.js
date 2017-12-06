import { combineReducers } from 'redux';
import user from './user';
import district from './district'

const rootReducer = combineReducers({
	user,
	district
});

export default rootReducer;
