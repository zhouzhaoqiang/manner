import _assign from 'lodash/assign';

export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';

export function saveUser(user) {
	return _assign({ type: SAVE_USER },user);
}

export function deleteUser() {
	return { type: DELETE_USER };
}


export const SAVE_DISTRICT = 'SAVE_DISTRICT';
export const DELETE_DISTRICT = 'DELETE_DISTRICT';

export function saveDistrict(district) {
	return _assign({ type: SAVE_DISTRICT },district);
}
