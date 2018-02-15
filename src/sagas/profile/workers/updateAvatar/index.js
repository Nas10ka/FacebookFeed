//Core
import { call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { actions } from 'react-redux-form';

//Instruments
import uiActions from '../../../../actions/ui';
import profileActions from '../../../../actions/profile';
import { api } from '../../../../instruments/api';
import pages from 'routes/pages';
export function* updateAvatarWorker ({ payload: avatar }) {
    try {
        yield put(uiActions.startAuthFetching()); // spinner start signal

        const token = yield select((state) => state.profile.token);
        const formData = new FormData();

        formData.append('avatar', avatar[0]);

        const response = yield call(fetch, `${api}/image`, {
            method:  'POST',
            headers: {
                Authorization: token,
            },
            body: formData,
        });

        const { data: { avatar: newAvatar }, message } = yield call([
            //filed data we renamed into profile
            response,
            response.json
        ]);

        if (response.status !== 200) {
            throw new Error(message);
            if (response.status === 400) {
                throw new Error(message);
            }
            if (response.status === 401) {
                localStorage.removeItem('token');
            }
            if (response.status === 415) {
                throw new Error('Невірний тип файлу');
            }
        }
        yield delay(1000);
        yield put(profileActions.updateAvatarSucceed(newAvatar));

        yield put(actions.reset('forms.user.profile.avatar')); // send names into profile
    } catch (error) {
        yield put(profileActions.updateAvatarFailed(error.message)); // dispatch all failed actions for sign up
    } finally {
        yield put(uiActions.stopAuthFetching()); // stop spinner for both cases (success, fail)
        yield put(uiActions.initialize());
    }
}
