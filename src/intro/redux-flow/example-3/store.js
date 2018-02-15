// Core
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

// Instrumnets
import rootReducer from '../core/reducers';

// This is a middleware
const logger = createLogger({
    duration:  true,
    collapsed: true,
    diff:      true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005',
    },
});

// This is a middleware
const middleware1 = () => (next) => (action) => {
    console.log('• middleware 1 •');

    next(action);
};

// This is a middleware
const middleware2 = () => (next) => (action) => {
    console.log('• middleware 2 •');

    next(action);
};

// Environment check
const dev = process.env.NODE_ENV === 'development'; // eslint-disable-line

const middleware = [middleware1, middleware2];

if (dev) {
    middleware.push(logger);
}

// Init store
export default createStore(rootReducer, applyMiddleware(...middleware));
