import { createSelector } from 'reselect';

// const getAuthenticated = (state) => state.auth;
//
// export const getAuth = createSelector(getAuthenticated, (auth) => auth.toJS());

export const getAuthenticated = createSelector(
    (auth) => auth,
    (auth) => auth.get('authenticated')
);
