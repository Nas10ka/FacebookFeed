// Instruments
import actions from './';
const error = new Error();

describe('Notification actions: ', () => {
    //login
    test('Invoke action action', () => {
        expect(actions.invoke(error)).toEqual({
            type:    'INVOKE',
            payload: {
                id: 'Unique ID',
                error,
            },
        });
    });
});
