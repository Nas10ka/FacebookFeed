//Core
import { call, put } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { replace } from 'react-router-redux';

//Instruments
import uiActions from 'actions/ui';
import authActions from 'actions/auth';
import profileActions from 'actions/profile';
import { api, groupId } from 'instruments/api';

export function* signupWorker ({ payload: user }) {
    try {
        yield put(uiActions.startAuthFetching()); // spinner start signal
        const response = yield call(fetch, `${api}/user/${groupId}`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        console.log(response);
        const { data: profile, message } = yield call([
            //filed data we renamed into profile
            response,
            response.json
        ]);

        console.log(profile);
        console.log(message);
        if (response.status !== 200) {
            throw new Error(message);
        }

        localStorage.setItem('token', profile.token); //token seted  into localStorage

        const { firstName, lastName } = profile;

        yield put(authActions.signupSucceed()); // authSUCCEED - true
        yield put(profileActions.fillProfile(profile));

        yield put(actions.change('forms.user.profile.firstName', firstName)); // send names into profile
        yield put(actions.change('forms.user.profile.lastName', lastName));
        yield put(actions.reset('forms.signup')); // reset form

        yield put(replace('/feed')); // jump into feed component after sign up
    } catch (error) {
        yield put(authActions.signupFaied(error.message)); // dispatch all failed actions for sign up
    } finally {
        yield put(uiActions.stopAuthFetching()); // stop spinner for both cases (success, fail)
    }
}
