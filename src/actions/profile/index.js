import types from './types';

export default Object.freeze({
    fillProfile: (user) => ({
        type:    types.FILL_PROFILE,
        payload: user,
    }),
    clearProfile: () => ({
        type: types.CLEAR_PROFILE,
    }),
    updateProfile: (user) => ({
        type:    types.UPDATE_PROFILE,
        payload: user,
    }),
    updateProfileSucceed: (user) => ({
        type:    types.UPDATE_PROFILE_SUCCEED,
        payload: user,
    }),
    updateProfileFailed: (error) => ({
        type:    types.UPDATE_PROFILE_FAILED,
        payload: error,
        error:   true,
    }),
    updateAvatar: (avatar) => ({
        type:    types.UPDATE_AVATAR,
        payload: avatar,
    }),
    updateAvatarSucceed: (url) => ({
        type:    types.UPDATE_AVATAR_SUCCEED,
        payload: url,
    }),
    updateAvatarFailed: (error) => ({
        type:    types.UPDATE_AVATAR_FAILED,
        payload: error,
        error:   true,
    }),
});
