import { Map, fromJS } from 'immutable';

//Instruments

import types from '../../actions/users/types';
import profileTypes from '../../actions/profile/types';

const initialState = Map({});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_USERS:
            return state.merge(action.payload);

        case profileTypes.FILL_PROFILE:
            return state.set(action.payload.id, fromJS(action.payload));

        default:
            return state;
    }
};
