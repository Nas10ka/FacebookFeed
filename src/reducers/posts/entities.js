//Core
import types from '../../actions/posts/types';
import { Map, fromJS, is } from 'immutable';

const initialState = Map({});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_POSTS_SUCCEED: {
            console.time('posts reducer: result');
            const newState = fromJS(action.payload.entities.posts);
            const result = is(state, newState) ? state : newState;

            console.timeEnd('posts reducer: result');

            return result;
        }

        case types.CREATE_POST_SUCCEED:
            return state.set(
                action.payload.result,
                fromJS(action.payload.entities.posts[action.payload.result])
            );

        case types.DELETE_POST_SUCCEED:
            return state.delete(action.payload);

        case types.CLEAR_POSTS:
            return initialState;

        case types.LIKE_POSTS_SUCCEED: {
            const { postID, userID } = action.payload;

            return state.update(postID, (post) =>
                post.update('likes', (likes) => likes.unshift(userID))
            );
        }

        case types.DISLIKE_POSTS_SUCCEED: {
            const { postID, userID } = action.payload;


            return state.update(postID, (post) =>
                // post.update('likes', (likes) => likes.shift(userID))
                post.update('likes', (likes) =>
                    likes.filter((liker) => liker !== userID)
                )
            );
        }

        default:
            return state;
    }
};
