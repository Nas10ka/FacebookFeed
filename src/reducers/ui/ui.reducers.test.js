//Instruments
import { Record } from 'immutable';
import reducer from './';

const initialState = new Record({
    initialized:  false,
    authFetching: false,
    feedFetching: false,
})();

describe('UI reducers:', () => {
    test('UI reducer initialized', () => {
        const next = reducer(initialState, { type: 'INITIALIZE' });

        expect(next).toMatchSnapshot();
    });
});
