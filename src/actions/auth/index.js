import types from './types';

export default Object.freeze({
    login: (user) => ({
        type:    types.LOGIN,
        payload: user,
    }),
    loginSucceed: () => ({
        type: types.LOGIN_SUCCEED,
    }),
    loginFailed: (error) => ({
        type:    types.LOGIN_FAILED,
        payload: error,
        error:   true,
    }),
    logout: () => ({
        type: types.LOGOUT,
    }),
    logoutSucceed: () => ({
        type: types.LOGOUT_SUCCEED,
    }),
    logoutFailed: (error) => ({
        type:    types.LOGOUT_FAILED,
        payload: error,
        error:   true,
    }),
    authenticate: (token) => ({
        type:    types.AUTHENTICATE,
        payload: token,
    }),
    authenticateSucceed: () => ({
        type: types.AUTHENTICATE_SUCCEED,
    }),
    authenticateFailed: (error) => ({
        type:    types.AUTHENTICATE_FAILED,
        payload: error,
        error:   true,
    }),
    signup: (signUp) => ({
        type:    types.SIGNUP,
        payload: {
            firstName: signUp.firstName,
            lastName:  signUp.lastName,
            password:  signUp.password,
            email:     signUp.email,
            invite:    signUp.invite,
        },
    }),
    signupSucceed: () => ({
        type: types.SIGNUP_SUCCEED,
    }),
    signupFailed: (error) => ({
        type:    types.SIGNUP_FAILED,
        payload: error,
        error:   true,
    }),
});
