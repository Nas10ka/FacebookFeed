// Core
import { createSelector } from 'reselect';

const getPostsIdsFromState = (state) => state.posts.result;
const getPostsMapFromState = (state) => state.posts.entities;
const getUsersFromState = (state) => state.users;

const getAuthorShape = createSelector(
    (author) => author,
    (author) => ({
        firstName: author.get('firstName'),
        lastName:  author.get('lastName'),
        avatar:    author.get('avatar'),
    })
);

const getLikesShape = createSelector(
    (state) => state.likes,
    (state) => state.users,
    (likes, users) =>
        likes.map((liker) => ({
            id:        liker,
            firstName: users.getIn([liker, 'firstName']),
            lastName:  users.getIn([liker, 'lastName']),
        }))
);

export const getPosts = createSelector(
    getPostsIdsFromState,
    getPostsMapFromState,
    getUsersFromState,
    (postsIds, postsMap, users) => {
        console.time('getPosts selector');

        const result = postsIds
            .map((id) =>
                postsMap
                    .get(id)
                    .merge(
                        users
                            .get(postsMap.getIn([id, 'author']))
                            .update((author) => getAuthorShape(author))
                    )
                    .update('likes', (likes) => getLikesShape({ likes, users }))
            )
            .toJS();

        console.timeEnd('getPosts selector');

        return result;
    }
);
