export const deletePostButton = document.createElement('button');
export const createPostButton = document.createElement('button');
export const createPostAsyncButton = document.createElement('button');

export const firstReducerButton = document.createElement('button');
export const secondReducerButton = document.createElement('button');

// --- Simple Buttons ---
createPostButton.innerText = 'Create post';
document.body.appendChild(createPostButton);

deletePostButton.innerText = 'Delete post';
document.body.appendChild(deletePostButton);

createPostAsyncButton.innerText = 'Create post async';
document.body.appendChild(createPostAsyncButton);
// --- Simple Buttons ---

// --- Buttons for replaceReducer ---
firstReducerButton.innerText = 'First reducer';
document.body.appendChild(firstReducerButton);

secondReducerButton.innerText = 'Second reducer';
document.body.appendChild(secondReducerButton);
// --- Button for replaceReducer ---

// Initialize list
document.body.appendChild(document.createElement('ul'));

export const render = (store) => () => {
    const oldList = document.querySelector('ul');
    const newList = document.createElement('ul');

    for (const { comment } of store.getState().posts) {
        const item = document.createElement('li');

        item.innerText = comment;
        newList.appendChild(item);
    }

    document.body.replaceChild(newList, oldList);
};
