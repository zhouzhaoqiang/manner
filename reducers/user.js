import {
	SAVE_USER,
	DELETE_USER
} from '../actions/';

const initialState = {
	phone: null,
	name:null,
	token: null,
	role_level: null,
	uid:null,
	openid: undefined,
	is_code_request: undefined
}

function user (state = initialState,action){
	switch (action.type){
		case SAVE_USER:
			return {
				'phone':action.phone,
				'name':action.name,
				'token':action.token,
				'role_level':action.role_level,
				'uid':action.uid,
				'openid': action.openid,
                'is_code_request': null
			};
		case DELETE_USER:
			return initialState;
		default:
			return state;
	}

}

export default user;
