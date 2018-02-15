import { all } from 'redux-saga/effects';
//Instruments

import auth from './auth';
import posts from './posts';
import profile from './profile';

export function* saga () {
    yield all([
        // эффект all принимает массив с вотчерами
        auth.signupWatcher(),
        auth.authenticateWatcher(),
        auth.logoutWatcher(),
        auth.loginWatcher(),

        posts.createPostWatcher(),
        posts.deletePostWatcher(),
        posts.likePostWatcher(),
        posts.dislikePostWatcher(),

        profile.updateProfileWatcher(),
        profile.updateAvatarWatcher()
    ]);
}
