import types from './types';

export default Object.freeze({
    fillUsers: (users) => ({
        type:    types.FILL_USERS,
        payload: users,
    }),
});
