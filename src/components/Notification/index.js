// Core
import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles';

export default class Notification extends Component {
    static propTypes = {
        dissolve: func.isRequired,
        error:    object.isRequired,
        id:       string.isRequired,
    };

    constructor () {
        super();

        this.handleNotificationAppear = this._handleNotificationAppear.bind(
            this
        );
        this.handleNotificationDisappear = this._handleNotificationDisappear.bind(
            this
        );
        this.hideNotification = this._hideNotification.bind(this);
    }

    state = {
        notificationIn: true,
    };

    _hideNotification () {
        this.setState({
            notificationIn: false,
        });
    }

    _handleNotificationAppear (postman) {
        fromTo(
            postman,
            1,
            { x: 500, opacity: 0 },
            {
                x:          0,
                opacity:    1,
                onComplete: () => {
                    setTimeout(this.hideNotification, 2000);
                },
            }
        );
    }

    _handleNotificationDisappear (postman) {
        const { dissolve, id } = this.props;

        fromTo(
            postman,
            2,
            { x: 0, opacity: 1 },
            {
                x:          500,
                opacity:    0,
                onComplete: () => {
                    dissolve(id);
                },
            }
        );
    }

    render () {
        const { error } = this.props;
        const { notificationIn } = this.state;

        return (
            <Transition
                appear
                in = { notificationIn }
                timeout = { 5000 }
                onClick = { this.hideNotification }
                onEnter = { this.handleNotificationAppear }
                onExit = { this.handleNotificationDisappear }>
                <section className = { Styles.notification }>
                    <h6>Error!</h6>
                    <span>{error}</span>
                </section>
            </Transition>
        );
    }
}
