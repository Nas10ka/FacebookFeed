// Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Instruments
import authActions from 'actions/auth';

// Components
import Notifications from 'components/Notifications';
import Spinner from 'components/Spinner';
import Navigation from 'components/Navigation';
import Catcher from 'components/Catcher';
import SignupForm from 'components/Forms/Signup';

class Signup extends Component {
    render () {
        const { authFetching, signup } = this.props;

        return (
            <Fragment>
                <Notifications />
                <Spinner spin = { authFetching } />
                <Navigation />
                <Catcher>
                    <SignupForm authFetching = { authFetching } signup = { signup } />
                </Catcher>
            </Fragment>
        );
    }
}
const mapStateToProps = ({ ui }) => ({
    authFetching: ui.authFetching,
});

const mapDispatchToProps = (dispatch) => ({
    signup: bindActionCreators(authActions.signup, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
