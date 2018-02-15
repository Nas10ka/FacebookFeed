//Core
import { call, put, select } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { replace } from 'react-router-redux';

//Instruments
import uiActions from '../../../../actions/ui';
import profileActions from '../../../../actions/profile';
import { api } from '../../../../instruments/api';
import pages from 'routes/pages';
export function* updateProfileWorker ({
    payload: {
        firstName,
        lastName,
        oldPassword,
        newPassword: password,
        avatar = [],
    },
}) {
    try {
        yield put(uiActions.startAuthFetching()); // spinner start signal
        if (avatar.length) {
            yield put(profileActions.updateAvatar(avatar));
        }
        const token = yield select((state) => state.profile.token);
        const response = yield call(fetch, `${api}/user`, {
            method:  'PUT',
            headers: {
                'Content-type': 'application/json',
                Authorization:  token,
            },
            body: JSON.stringify({
                firstName,
                lastName,
                oldPassword,
                password,
            }),
        });

        const { data: user, message } = yield call([
            //filed data we renamed into profile
            response,
            response.json
        ]);

        if (response.status !== 200) {
            throw new Error(message);
            if (response.status === 400) {
                localStorage.removeItem('token');
            }
            if (response.status === 401) {
                localStorage.removeItem('token');
            }
        }
        yield put(profileActions.updateProfileSucceed(user));

        yield put(actions.reset('forms.user.password.oldPassword')); // send names into profile
        yield put(actions.reset('forms.user.password.newPassword'));
    } catch (error) {
        yield put(profileActions.updateProfileFailed(error.message)); // dispatch all failed actions for sign up
    } finally {
        yield put(uiActions.stopAuthFetching()); // stop spinner for both cases (success, fail)
        yield put(uiActions.initialize());
    }
}
