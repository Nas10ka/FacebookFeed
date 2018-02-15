// Core
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Notification from 'components/Notification';
import notificationsActions from 'actions/notifications';

const Notifications = ({ notifications, dissolve }) =>
    notifications.map((notification) => (
        <Notification
            dissolve = { dissolve }
            key = { notification.id }
            { ...notification }
        />
    ));

const mapStateToProps = ({ notifications }) => ({
    notifications,
});

const mapDispatchToProps = (dispatch) => ({
    dissolve: bindActionCreators(notificationsActions.dissolve, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
