//Core
import actions from './';

const user = {
    firstName: 'John',
    lastName:  'Snow',
};

const avatar = 'avatar';
const error = 'error';
const url = 'url';

describe('Profile actions:', () => {
    test('Fill Profile action', () => {
        expect(actions.fillProfile(user)).toMatchSnapshot();
    });
    test('Update Profile action', () => {
        expect(actions.updateProfile(user)).toMatchSnapshot();
    });
    test('Update Profile Succeed action', () => {
        expect(actions.updateProfileSucceed(user)).toMatchSnapshot();
    });
    test('Update Profile Failed action', () => {
        expect(actions.updateProfileFailed(error)).toMatchSnapshot();
    });
    test('Update Profile action', () => {
        expect(actions.updateAvatar(avatar)).toMatchSnapshot();
    });
    test('Update Avatar Succeed action', () => {
        expect(actions.updateAvatarSucceed(url)).toMatchSnapshot();
    });
    test('Update Avatar Failed action', () => {
        expect(actions.updateAvatarFailed(error)).toMatchSnapshot();
    });
    test('Clear Profile action', () => {
        expect(actions.clearProfile()).toMatchSnapshot();
    });
});
