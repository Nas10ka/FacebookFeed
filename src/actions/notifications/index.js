import types from './types';
import { v4 } from 'uuid';

export default Object.freeze({
    invoke: (error) => ({
        type:    types.INVOKE,
        payload: {
            id: v4(),
            error,
        },
    }),
    dissolve: (id) => ({
        type:    types.DISSOLVE,
        payload: id,
    }),
});
