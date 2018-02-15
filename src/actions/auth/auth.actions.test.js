// authentication tests
// В тесте нужны action creators
// Instruments
import actions from './';

const user = {
    firstName: 'John',
    lastName:  'Snow',
};
const signUp = {
    firstName: user.firstName,
    lastName:  user.lastName,
    password:  12345,
    email:     'john@snow.com',
    invite:    'qwerty123456',
};
const token = 'tokenforjest';

const error = {
    message: 'An error occured.',
};

describe('Auth actions: ', () => {
    //login
    test('Login action', () => {
        expect(actions.login(user)).toEqual({
            type:    'LOGIN',
            payload: user,
        });
    });
    test('Login succeed action', () => {
        expect(actions.loginSucceed()).toEqual({
            type: 'LOGIN_SUCCEED',
        });
    });
    test('Login failed action', () => {
        expect(actions.loginFailed(error)).toEqual({
            type:    'LOGIN_FAILED',
            payload: error,
            error:   true,
        });
    });

    //logout
    test('Logout action', () => {
        expect(actions.logout()).toEqual({
            type: 'LOGOUT',
        });
    });
    test('Logout succeed action', () => {
        expect(actions.logoutSucceed()).toEqual({
            type: 'LOGOUT_SUCCEED',
        });
    });
    test('Logout failed action', () => {
        expect(actions.logoutFailed(error)).toEqual({
            type:    'LOGOUT_FAILED',
            payload: error,
            error:   true,
        });
    });

    //signup
    test('Sign Up action', () => {
        expect(actions.signup(signUp)).toEqual({
            type:    'SIGNUP',
            payload: {
                firstName: signUp.firstName,
                lastName:  signUp.lastName,
                password:  signUp.password,
                email:     signUp.email,
                invite:    signUp.invite,
            },
        });
    });
    test('Sign Up succeed action', () => {
        expect(actions.signupSucceed()).toEqual({
            type: 'SIGNUP_SUCCEED',
        });
    });
    test('Sign Up failed action', () => {
        expect(actions.signupFailed(error)).toEqual({
            type:    'SIGNUP_FAILED',
            payload: error,
            error:   true,
        });
    });

    //authenticate
    test('Authenticate action', () => {
        expect(actions.authenticate(token)).toEqual({
            type:    'AUTHENTICATE',
            payload: token,
        });
    });
    test('Authenticate succeed action', () => {
        expect(actions.authenticateSucceed()).toEqual({
            type: 'AUTHENTICATE_SUCCEED',
        });
    });
    test('Authenticate failed action', () => {
        expect(actions.authenticateFailed(error)).toEqual({
            type:    'AUTHENTICATE_FAILED',
            payload: error,
            error:   true,
        });
    });
});
