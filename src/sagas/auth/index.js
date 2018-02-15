//Core
import { takeEvery } from 'redux-saga/effects';

//Instruments
import types from '../../actions/auth/types';
import { signupWorker } from './workers/signup';
import { authenticateWorker } from './workers/authenticate';
import { logoutWorker } from './workers/logout';
import { loginWorker } from './workers/login';

export default Object.freeze({
    * signupWatcher () {
        yield takeEvery(types.SIGNUP, signupWorker);
    },
    * authenticateWatcher () {
        yield takeEvery(types.AUTHENTICATE, authenticateWorker);
    },
    * logoutWatcher () {
        yield takeEvery(types.LOGOUT, logoutWorker);
    },
    * loginWatcher () {
        yield takeEvery(types.LOGIN, loginWorker);
    },
});
