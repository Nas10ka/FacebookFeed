// Instrumnets
import { combineReducers } from 'redux';
import store from './store';
import { createPost } from '../core/actions/posts';
import {
    render,
    firstReducerButton,
    secondReducerButton
} from '../core/render';

import firstReucer from '../core/reducers';
import secondReducer from './reducer';

const newReducer = combineReducers({
    posts: () => [{ id: '123', comment: 'New reducer.' }],
});

// Create post on click
firstReducerButton.addEventListener('click', () => {
    store.replaceReducer(firstReucer);

    if (store.getState().posts.length > 5) {
        store.replaceReducer(newReducer);
    }

    store.dispatch(createPost());
});

// Create post on click
secondReducerButton.addEventListener('click', () => {
    store.replaceReducer(secondReducer);

    store.dispatch(createPost());
});

render(store)();
store.subscribe(render(store));
