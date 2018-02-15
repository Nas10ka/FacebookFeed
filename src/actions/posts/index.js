//Instructions
import types from './types';
import { api, groupId } from '../../instruments/api';
import { normalize } from 'normalizr';
import { post } from '../../shemas';
import usersActions from '../users';
export default Object.freeze({
    fetchPosts: () => async (dispatch) => {
        try {
            const response = await fetch(`${api}/feed?size=30`, {
                method:  'GET',
                headers: {
                    'x-no-auth': groupId,
                },
            });

            const { data, message } = await response.json();

            console.log('data', data);
            if (response.status !== 200) {
                throw new Error(message);
            }

            const normilizedPosts = normalize(data, [post]);

            dispatch(usersActions.fillUsers(normilizedPosts.entities.users));

            dispatch({
                type:    types.FETCH_POSTS_SUCCEED,
                payload: normilizedPosts,
            });
        } catch (error) {
            dispatch({
                type:    types.FETCH_POSTS_FAILED,
                payload: error.message,
                error:   true,
                meta:    'Additional info',
            });
        } finally {
            console.log('finally');
        }
    },
    clearPosts: () => ({
        type: types.CLEAR_POSTS,
    }),

    createPost: (comment) => ({
        type:    types.CREATE_POST,
        payload: comment,
    }),
    createPostSucceed: (newPost) => ({
        type:    types.CREATE_POST_SUCCEED,
        payload: newPost,
    }),
    createPostFailed: (error) => ({
        type:    types.CREATE_POST_FAILED,
        payload: error,
        error:   true,
    }),

    deletePost: (id) => ({
        type:    types.DELETE_POST,
        payload: id,
    }),
    deletePostSucceed: (id) => ({
        type:    types.DELETE_POST_SUCCEED,
        payload: id,
    }),
    deletePostFailed: (error) => ({
        type:    types.DELETE_POST_FAILED,
        payload: error,
        error:   true,
    }),

    likePost: (id) => ({
        type:    types.LIKE_POSTS,
        payload: id,
    }),
    likePostSucceed: (id) => ({
        type:    types.LIKE_POSTS_SUCCEED,
        payload: id,
    }),
    likePostFailed: (error) => ({
        type:    types.LIKE_POSTS_FAILED,
        payload: error,
        error:   true,
    }),
    dislikePost: (id) => ({
        type:    types.DISLIKE_POSTS,
        payload: id,
    }),
    dislikePostSucceed: (id) => ({
        type:    types.DISLIKE_POSTS_SUCCEED,
        payload: id,
    }),
    dislikePostFailed: (error) => ({
        type:    types.DISLIKE_POSTS_FAILED,
        payload: error,
        error:   true,
    }),
});
