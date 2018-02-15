// Core
import { combineReducers } from 'redux';

import { routerReducer as router } from 'react-router-redux';
//Instruments
import posts from './posts/index';
import notifications from './notifications/index';
import auth from './auth/index';
import profile from './profile/index';
import ui from './ui/index';
import forms from './forms/index';
import users from './users/index';

export default combineReducers({
    router,
    posts,
    notifications,
    auth,
    profile,
    ui,
    forms,
    users,
});
