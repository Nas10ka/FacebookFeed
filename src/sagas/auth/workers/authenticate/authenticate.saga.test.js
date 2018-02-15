//COre
import { put, call } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { replace } from 'react-router-redux';
import { cloneableGenerator } from 'redux-saga/utils';

//Instruments
import { authenticateWorker } from './';
import uiActions from '../../../../actions/ui';
import authActions from '../../../../actions/auth';
import profileActions from '../../../../actions/profile';
import { api } from '../../../../instruments/api';
import pages from '../../../../routes/pages';
import {
    error,
    profile,
    token,
    setup,
    response,
    responseData,
    responseDataFail,
    responseFail
} from '../../../../_mocks';
setup();
const authenticateAction = authActions.authenticate(token);
const url = `${api}/user/login`;

const saga = cloneableGenerator(authenticateWorker)(authenticateAction); // запуск функции-генератора, с передачей параметра типа action

describe('authenticate saga', () => {
    test('should dispatch START_AUTH_FETCHING action', () => {
        expect(saga.next().value).toEqual(put(uiActions.startAuthFetching()));
    });
    test(`should call a 'fetch' request`, () => {
        expect(saga.next().value).toEqual(
            call(fetch, url, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            })
        );
    });
    test('should handle !== 200 response status', () => {
        const clone = saga.clone();

        expect(clone.next(responseFail).value).toEqual(
            call([responseFail, responseFail.json])
        );
        expect(clone.next(responseDataFail).value).toEqual(
            put(authActions.authenticateFailed(error.message))
        );
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
        expect(localStorage.getItem('token')).toBeUndefined();
    });
    test('the "fetch" request should return a valid response', () => {
        expect(saga.next(response).value).toEqual(
            call([response, response.json])
        );
    });
    test('should dispatch "AUTHENTICATE_SUCCEED" action', () => {
        expect(saga.next(responseData).value).toEqual(
            put(authActions.authenticateSucceed())
        );
    });
    test('localStorage should contain a token', () => {
        expect(localStorage.getItem('token')).toBe(token);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledWith('token');
    });
    test('should dispatch "FILL_PROFILE" action', () => {
        expect(saga.next().value).toEqual(
            put(profileActions.fillProfile(profile))
        );
    });
    test('should dispatch "CHANGE" action', () => {
        expect(saga.next().value).toEqual(
            put(
                actions.change(
                    'forms.user.profile.firstName',
                    profile.firstName
                )
            )
        );
    });
    test('should dispatch "CHANGE" action', () => {
        expect(saga.next().value).toEqual(
            put(actions.change('forms.user.profile.lastName', profile.lastName))
        );
    });
    test('should dispatch "REPLACE" action', () => {
        expect(saga.next().value).toEqual(put(replace(pages.feed)));
    });
    test('should dispatch "stopAuthFetching" action', () => {
        expect(saga.next().value).toEqual(put(uiActions.stopAuthFetching()));
    });
    test('should dispatch "initialize" action', () => {
        expect(saga.next().value).toEqual(put(uiActions.initialize()));
    });
    test('should dispatch "initialize" action', () => {
        expect(saga.next().done).toBe(true);
    });
});
