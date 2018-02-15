//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, withRouter } from 'react-router';
import { getAuthenticated } from '../selectors/auth';
import uiActions from '../actions/ui';
// import authActions from 'actions/auth'

//Instruments
// import pages from './pages';
import authActions from '../actions/auth';

//Routing
import Public from './public';
import Private from './private';

//Components
import Catcher from 'components/Catcher';
import Loading from 'components/Loading';

class Routes extends Component {
    componentDidMount () {
        const { initialize, authenticate } = this.props;
        // const { location, history, initialize, authenticated, authenticate } = this.props;

        const token = localStorage.getItem('token');

        token ? authenticate(token) : initialize();
        // if (authenticate) {
        //     if (location.pathname === pages.profile) {
        //         return;
        //     } else {
        //
        //     }
        //
        // }
    }
    render () {
        console.log(this.props);
        const { authenticated, initialized } = this.props;

        return initialized ? (
            <Catcher>
                <Switch>
                    {!authenticated && <Public />}
                    <Private />
                </Switch>
            </Catcher>
        ) : (
            <Loading />
        );
    }
}
const mapStateToProps = ({ auth, ui }) => ({
    authenticated: getAuthenticated(auth),
    initialized:   ui.initialized,
});
const { authenticate } = authActions;
const { initialize } = uiActions;

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            authenticate,
            initialize,
        },
        dispatch
    );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
