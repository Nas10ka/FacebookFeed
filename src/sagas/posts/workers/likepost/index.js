//Core
import { call, put, select } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { replace } from 'react-router-redux';

//Instruments
import uiActions from '../../../../actions/ui';
import postActions from '../../../../actions/posts';
import profileActions from 'actions/profile';
import { api } from '../../../../instruments/api';
import pages from 'routes/pages';
export function* likePostWorker ({ payload: postID }) {
    try {
        yield put(uiActions.startAuthFetching()); // spinner start signal
        const { token, id: userID } = yield select((state) => state.profile);
        const response = yield call(fetch, `${api}/feed/like/${postID}`, {
            method:  'PUT',
            headers: {
                Authorization: token,
            },
        });

        // console.log(response);

        if (response.status !== 204) {
            const { message } = yield call([
                //filed data we renamed into profile
                response,
                response.json
            ]);

            throw new Error(message);
            if (response.status === 400) {
                // localStorage.removeItem('token');
            }
            if (response.status === 401) {
                // localStorage.removeItem('token');
            }
        }

        yield put(postActions.likePostSucceed({ postID, userID })); // authSUCCEED - true
        yield put(replace(pages.feed)); // jump into feed component after sign up
    } catch (error) {
        yield put(postActions.likePostFailed(error.message)); // dispatch all failed actions for sign up
    } finally {
        yield put(uiActions.stopAuthFetching()); // stop spinner for both cases (success, fail)
        yield put(uiActions.initialize());
    }
}
