// Core
import { createStore, applyMiddleware } from 'redux';

// Instrumnets
import rootReducer from '../core/reducers';

// This is a middleware
const logger = (store) => (next) => (action) => {
    console.log('• An action to be dispatched •', action);
    console.log('• Previous state •', store.getState());

    next(action);

    console.log('• Next state •', store.getState());
};

// Init store
export default createStore(rootReducer, applyMiddleware(logger));
