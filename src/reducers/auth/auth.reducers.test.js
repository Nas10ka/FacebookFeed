//Instruments
import { Map } from 'immutable';
import reducer from './';

const initialState = Map({
    authenticated: false,
});

describe('Auth reducers: ', () => {
    //reducer
    test('should return the initial state true', () => {
        expect(
            reducer(initialState, {
                type: 'LOGIN_SUCCEED',
            })
        ).toEqual(initialState.set('authenticated', true));
        expect(
            reducer(initialState, {
                type: 'SIGNUP_SUCCEED',
            })
        ).toEqual(initialState.set('authenticated', true));
        expect(
            reducer(initialState, {
                type: 'AUTHENTICATE_SUCCEED',
            })
        ).toEqual(initialState.set('authenticated', true));
    });
    test('should return the initial state false', () => {
        expect(reducer(initialState, { type: 'LOGOUT_SUCCEED' })).toEqual(
            initialState.set('authenticated', false)
        );
    });
    test('default reducer', () => {
        expect(reducer(initialState, { type: '___' })).toEqual(initialState);
    });

    test('default reducer', () => {
        expect(reducer(undefined, { type: '___' })).toEqual(initialState);
    });
});
