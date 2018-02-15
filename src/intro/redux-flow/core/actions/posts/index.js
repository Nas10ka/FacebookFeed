// Instruments
import { DELETE_POST, CREATE_POST, CREATE_POST_ASYNC } from './types';
import { lorem } from 'faker';

export const deletePost = (postId) => ({
    type:    DELETE_POST,
    payload: postId,
});

export const createPost = () => ({
    type:    CREATE_POST,
    payload: lorem.sentence(),
});

export const createPostAsync = () => async (dispatch) => {
    const response = await fetch('http://date.jsontest.com/');

    const { time } = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch({
        type:    CREATE_POST_ASYNC,
        payload: `A current time is: ${time}.`,
    });
};
