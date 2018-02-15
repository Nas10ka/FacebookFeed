//Core
import { takeEvery } from 'redux-saga/effects';

//Instruments
import types from '../../actions/posts/types';
import { createPostWorker } from './workers/createPost';
import { deletePostWorker } from './workers/deletePost';
import { likePostWorker } from './workers/likepost';
import { dislikePostWorker } from './workers/dislikepost';

export default Object.freeze({
    * createPostWatcher () {
        yield takeEvery(types.CREATE_POST, createPostWorker);
    },
    * deletePostWatcher () {
        yield takeEvery(types.DELETE_POST, deletePostWorker);
    },
    * likePostWatcher () {
        yield takeEvery(types.LIKE_POSTS, likePostWorker);
    },
    * dislikePostWatcher () {
        yield takeEvery(types.DISLIKE_POSTS, dislikePostWorker);
    },
});
