//Core
import types from './types';

export default Object.freeze({
    initialize: () => ({
        type: types.INITIALIZE,
    }),
    startAuthFetching: () => ({
        type: types.START_AUTH_FETCHING,
    }),
    stopAuthFetching: () => ({
        type: types.STOP_AUTH_FETCHING,
    }),
    startFeedFetching: () => ({
        type: types.START_FEED_FETCHING,
    }),
    stopFeedFetching: () => ({
        type: types.STOP_FEED_FETCHING,
    }),
    startProfileFetching: () => ({
        type: types.START_PROFILE_FETCHING,
    }),
    stopProfileFetching: () => ({
        type: types.STOP_PROFILE_FETCHING,
    }),
    startAvatarFetching: () => ({
        type: types.START_AVATAR_FETCHING,
    }),
    stopAvatarFetching: () => ({
        type: types.STOP_AVATAR_FETCHING,
    }),
    startProfileEditing: () => ({
        type: types.START_PROFILE_EDITING,
    }),
    stopProfileEditing: () => ({
        type: types.STOP_PROFILE_EDITING,
    }),
});
