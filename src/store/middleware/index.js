//Instruments
import notificationActions from 'actions/notifications';

export const notify = (store) => (next) => (action) => {
    if (action.error) {
        store.dispatch(notificationActions.invoke(action.payload));
    }

    next(action);
};
