//Core
import { call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';

//Instruments
import uiActions from '../../../../actions/ui';
import postActions from '../../../../actions/posts';
import { api } from '../../../../instruments/api';
import { post } from 'shemas';

export function* createPostWorker ({ payload: comment }) {
    try {
        yield put(uiActions.startFeedFetching()); // spinner start signal
        const token = yield select((state) => state.profile.token);

        const response = yield call(fetch, `${api}/feed`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  token,
            },
            body: JSON.stringify({ comment }),
        });

        // console.log(response);
        const { data: denormalizedPost, message } = yield call([
            //filed data we renamed into profile
            response,
            response.json
        ]);
        // console.log(denormalizedPost);

        if (response.status !== 200) {
            if (response.status === 401) {
                localStorage.removeItem('token');
            }

            throw new Error(message);
        }
        console.log(denormalizedPost);

        const normalizedPosts = normalize(denormalizedPost, post);

        yield put(postActions.createPostSucceed(normalizedPosts));
        console.log(normalizedPosts);
    } catch (error) {
        yield put(postActions.createPostFailed(error.message)); // dispatch all failed actions for sign up
    } finally {
        yield put(uiActions.stopFeedFetching()); // stop spinner for both cases (success, fail)
        yield put(uiActions.initialize());
    }
}
