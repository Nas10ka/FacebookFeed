// Instruments
import {
    DELETE_POST,
    CREATE_POST,
    CREATE_POST_ASYNC
} from '../../actions/posts/types';
import { random } from 'faker';

const initialState = [{ id: '123', comment: 'Initial reducer comment.' }];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_POST:
        case CREATE_POST_ASYNC:
            return [...state, { id: random.uuid(), comment: payload }];

        case DELETE_POST:
            return state.filter((post) => post.id !== payload);

        default:
            return state;
    }
};
