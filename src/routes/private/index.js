//Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

//Instruments
import pages from '../pages';

//Containers
import NewPassword from '../../containers/NewPassword';
import Profile from '../../containers/Profile';
import Feed from '../../containers/Feed';

export default class Private extends Component {
    render () {
        return (
            <Switch>
                <Route exact component = { NewPassword } path = { pages.newPassword } />
                <Route exact component = { Profile } path = { pages.profile } />
                <Route exact component = { Feed } path = { pages.feed } />
                <Redirect to = { pages.feed } /> constructor
            </Switch>
        );
    }
}

//без exact
// ../login/any/other/route

// c exact
// ../login
