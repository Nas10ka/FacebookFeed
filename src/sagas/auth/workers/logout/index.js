//Core
import { call, put, select } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { replace } from 'react-router-redux';

//Instruments
import uiActions from '../../../../actions/ui';
import authActions from '../../../../actions/auth';
import profileActions from '../../../../actions/profile';
import postsActions from '../../../../actions/posts';
import { api, groupId } from '../../../../instruments/api';

export function* logoutWorker () {
    try {
        // const { token } = (state) => state.profile;
        const token = yield select((state) => state.profile.token);

        yield put(uiActions.startAuthFetching()); // spinner start signal
        const response = yield call(fetch, `${api}/user/logout`, {
            method:  'GET',
            headers: {
                Authorization: token,
            },
        });

        if (response.status !== 204) {
            const { message } = yield call([
                //filed data we renamed into profile
                response,
                response.json
            ]);

            throw new Error(message);
        }

        yield put(authActions.logoutSucceed()); // authSUCCEED - true

        yield put(replace('/login')); // jump into feed component after sign up
    } catch (error) {
        yield put(authActions.logoutFailed(error.message)); // dispatch all failed actions for sign up
    } finally {
        localStorage.removeItem('token');
        yield put(postsActions.clearPosts());
        yield put(profileActions.clearProfile());
        yield put(uiActions.stopAuthFetching()); // stop spinner for both cases (success, fail)
        yield put(uiActions.initialize());
    }
}
