//Core
import { call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';

//Instruments
import uiActions from '../../../../actions/ui';
import postActions from '../../../../actions/posts';
import { api } from '../../../../instruments/api';
import { post } from 'shemas';

export function* deletePostWorker ({ payload: id }) {
    try {
        yield put(uiActions.startFeedFetching()); // spinner start signal
        const token = yield select((state) => state.profile.token);

        const response = yield call(fetch, `${api}/feed/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: token,
            },
        });

        if (response.status !== 204) {
            if (response.status === 401) {
                localStorage.removeItem('token');
            }

            const { message } = yield call([
                //filed data we renamed into profile
                response,
                response.json
            ]);

            throw new Error(message);
        }
        yield put(postActions.deletePostSucceed(id));
    } catch (error) {
        yield put(postActions.deletePostFailed(error.message)); // dispatch all failed actions for sign up
    } finally {
        yield put(uiActions.stopFeedFetching()); // stop spinner for both cases (success, fail)
        yield put(uiActions.initialize());
    }
}
