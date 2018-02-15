//Core
import { call, put } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { replace } from 'react-router-redux';

//Instruments
import uiActions from '../../../../actions/ui';
import authActions from 'actions/auth';
import profileActions from 'actions/profile';
import { api } from '../../../../instruments/api';
import pages from 'routes/pages';

export function* authenticateWorker ({ payload: token }) {
    try {
        yield put(uiActions.startAuthFetching()); // spinner start signal
        const response = yield call(fetch, `${api}/user/login`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        // console.log(response);
        const { data: profile, message } = yield call([
            //filed data we renamed into profile
            response,
            response.json
        ]);

        if (response.status !== 200) {
            if (response.status === 401) {
                localStorage.removeItem('token');
            }
            throw new Error(message);
        }
        localStorage.setItem('token', profile.token);

        const { firstName, lastName } = profile;

        yield put(authActions.authenticateSucceed()); // authSUCCEED - true
        yield put(profileActions.fillProfile(profile));

        yield put(actions.change('forms.user.profile.firstName', firstName)); // send names into profile
        yield put(actions.change('forms.user.profile.lastName', lastName));

        yield put(replace(pages.feed)); // jump into feed component after sign up
    } catch (error) {
        yield put(authActions.authenticateFailed(error.message)); // dispatch all failed actions for sign up
    } finally {
        yield put(uiActions.stopAuthFetching()); // stop spinner for both cases (success, fail)
        yield put(uiActions.initialize());
    }
}
