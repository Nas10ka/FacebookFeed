//Core
import types from '../../actions/notifications/types';
import { List } from 'immutable';

const initialState = List([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INVOKE:
            return state.size < 3 ? state.push(action.payload) : state; // перепиано с Immutable.js
        // return state.length < 3 ? [...state, action.payload] : state;

        case types.DISSOLVE:
            return state.filter(({ id }) => id !== action.payload);

        default:
            return state;
    }
};
