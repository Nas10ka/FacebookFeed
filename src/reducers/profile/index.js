//Core
import { Record } from 'immutable';

//Instruments
import types from '../../actions/profile/types';

const initialState = new Record({
    id:        '',
    token:     '',
    created:   0,
    avatar:    '',
    firstName: '',
    lastName:  '',
    email:     '',
    groupId:   '',
})();

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_PROFILE:
        case types.UPDATE_PROFILE_SUCCEED:
            return state.merge(action.payload);
        case types.UPDATE_AVATAR_SUCCEED:
            return state.set('avatar', action.payload);
        case types.CLEAR_PROFILE:
            return initialState;
        default:
            return state;
    }
};
