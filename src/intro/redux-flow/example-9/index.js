// Instrumnets
import store from './store';
import { createPost } from '../core/actions/posts';
import { render, createPostButton } from '../core/render';

// Create post on click
createPostButton.addEventListener('click', () => {
    store.dispatch(createPost());
});

render(store)();
store.subscribe(render(store));
