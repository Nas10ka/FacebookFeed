//Core
import { call, put } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { replace } from 'react-router-redux';

//Instruments
import uiActions from '../../../../actions/ui';
import authActions from '../../../../actions/auth';
import profileActions from 'actions/profile';
import { api, groupId } from '../../../../instruments/api';

export function* loginWorker ({ payload: user }) {
    try {
        yield put(uiActions.startAuthFetching()); // spinner start signal
        const response = yield call(fetch, `${api}/user/login`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        // console.log(response);
        const { data: profile, message } = yield call([
            //filed data we renamed into profile
            response,
            response.json
        ]);

        if (response.status !== 200) {
            throw new Error(message);
            if (response.status === 401) {
                localStorage.removeItem('token');
            }
        }
        if (user.remember) {
            localStorage.setItem('token', profile.token); //token seted  into localStorage
        }

        // localStorage.setItem('token', profile.token); //token seted  into localStorage

        const { firstName, lastName } = profile;

        yield put(authActions.loginSucceed()); // authSUCCEED - true
        yield put(profileActions.fillProfile(profile));

        yield put(actions.change('forms.user.profile.firstName', firstName)); // send names into profile
        yield put(actions.change('forms.user.profile.lastName', lastName));
        yield put(actions.reset('forms.login'));

        yield put(replace('/feed')); // jump into feed component after sign up
    } catch (error) {
        yield put(authActions.loginFailed(error.message)); // dispatch all failed actions for sign up
    } finally {
        yield put(uiActions.stopAuthFetching()); // stop spinner for both cases (success, fail)
        yield put(uiActions.initialize());
    }
}
