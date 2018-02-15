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

// Init store with persisted state as second argument
export default createStore(
    rootReducer,
    { posts: [{ id: '123', comment: 'Persisted...' }]},
    applyMiddleware(logger)
);
