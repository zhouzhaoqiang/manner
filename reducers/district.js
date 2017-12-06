import {
	SAVE_DISTRICT,
  DELETE_DISTRICT
} from '../actions/';

const initialState = null;

function district (state = initialState,action){
	switch (action.type){
		case SAVE_DISTRICT:
			return action.district;
		case DELETE_DISTRICT:
			return initialState;
		default:
			return state;
	}

}

export default district;
