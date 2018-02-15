// Core
import { Map } from 'immutable';

//Instruments
import types from '../../actions/auth/types';

const initialState = Map({
    authenticated: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCEED:
        case types.SIGNUP_SUCCEED:
        case types.AUTHENTICATE_SUCCEED:
            return state.set('authenticated', true);

        case types.LOGOUT_SUCCEED:
            return state.set('authenticated', false);

        default:
            return state;
    }
};
