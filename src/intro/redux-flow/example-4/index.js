// Instrumnets
import store from './store';
import { createPost } from '../core/actions/posts';
import { render, createPostButton, deletePostButton } from '../core/render';
import { postsDeleter } from '../core/utils';

const deletePost = postsDeleter(store);

// Create post on click
createPostButton.addEventListener('click', () => {
    store.dispatch(createPost());
});

// Delete post on click
deletePostButton.addEventListener('click', () => {
    deletePost.next();
});

render(store)();
store.subscribe(render(store));
