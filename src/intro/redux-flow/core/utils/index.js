// Core
import { deletePost } from '../actions/posts';

export function* postsDeleter (store) {
    while (true) {
        const { posts: [post] } = store.getState();

        if (post) {
            yield store.dispatch(deletePost(post.id));
        } else {
            console.log('• There is no more posts to delete. •');
            yield;
        }
    }
}
