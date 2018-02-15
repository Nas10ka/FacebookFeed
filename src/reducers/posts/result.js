//Core
import types from '../../actions/posts/types';
import { List, fromJS, is } from 'immutable';

const initialState = List([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_POSTS_SUCCEED: {
            console.time('posts reducer: result');
            const newState = fromJS(action.payload.result);
            const result = is(state, newState) ? state : newState;

            console.timeEnd('posts reducer: result');

            return result;
        }

        case types.CREATE_POST_SUCCEED:
            return state.unshift(action.payload.result);

        case types.DELETE_POST_SUCCEED:
            return state.filter((id) => id !== action.payload);

        case types.CLEAR_POSTS:
            return initialState;

        // case types.LIKE_POSTS_SUCCEED:
        // return state.filter((id) => id !== action.payload);

        default:
            return state;
    }
};
