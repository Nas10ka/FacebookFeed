// Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import profileActions from '../../actions/profile';
import uiActions from '../../actions/ui';

// Components
import Notifications from 'components/Notifications';
import Spinner from 'components/Spinner';
import Navigation from 'components/Navigation';
import Catcher from 'components/Catcher';
import ProfileForm from '../../components/Forms/Profile';

class Profile extends Component {
    render () {
        console.log('Profile', this.props);
        const {
            actions,
            profile,
            avatarFetching,
            profileEditing,
            profileFetching,
        } = this.props;


        return (
            <Fragment>
                <Notifications />
                <Spinner />
                <Navigation />
                <Catcher>
                    <ProfileForm
                        actions = { actions }
                        avatarFetching = { avatarFetching }
                        profile = { profile }
                        profileEditing = { profileEditing }
                        profileFetching = { profileFetching }
                    />
                </Catcher>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    profile:         state.profile,
    profileFetching: state.ui.profileFetching,
    profileEditing:  state.ui.profileEditing,
    avatarFetching:  state.ui.avatarFetching,
});

const { startProfileEditing, stopProfileEditing } = uiActions;

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        { ...profileActions, startProfileEditing, stopProfileEditing },
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
