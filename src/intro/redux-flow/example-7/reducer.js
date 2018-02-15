// Core
import { combineReducers } from 'redux';
import { random } from 'faker';

// Instruments
import {
    DELETE_POST,
    CREATE_POST,
    CREATE_POST_ASYNC
} from '../core/actions/posts/types';

const initialState = [{ id: '123', comment: 'Second reducer comment.' }];

export default combineReducers({
    posts: (state = initialState, { type, payload }) => {
        switch (type) {
            case CREATE_POST:
            case CREATE_POST_ASYNC:
                return [...state, { id: random.uuid(), comment: payload }];

            case DELETE_POST:
                return state.filter((post) => post.id !== payload);

            default:
                return state;
        }
    },
});
