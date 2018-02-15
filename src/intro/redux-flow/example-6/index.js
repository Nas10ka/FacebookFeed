// Instrumnets
import { bindActionCreators } from 'redux';
import store from './store';
import * as actions from '../core/actions/posts';
import {
    render,
    deletePostButton,
    createPostButton,
    createPostAsyncButton
} from '../core/render';
import { postsDeleter } from '../core/utils';

const { createPost, createPostAsync } = bindActionCreators(
    actions,
    store.dispatch
);

const deletePost = postsDeleter(store);

// Create post on click
createPostButton.addEventListener('click', () => {
    createPost();
});

// Delete post on click
deletePostButton.addEventListener('click', () => {
    deletePost.next();
});

// Create post async on click
createPostAsyncButton.addEventListener('click', () => {
    createPostAsync();
});

render(store)();
store.subscribe(render(store));
