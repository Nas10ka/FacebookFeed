// Core
import { EventEmitter } from 'events';

// Instruments
import dispatcher from '../../dispatcher';
import { CHANGE_PAGE } from '../../actions/book/types';

export default new class BookStore extends EventEmitter {
    constructor () {
        super(); // всегда, когда пишем extends

        this.state = {
            currentPage: 0,
            totalPages:  698,
            title:       'Magic and Enchantment',
        };

        dispatcher.register((action) => {
            switch (action.type) {
                case CHANGE_PAGE:
                    this.changePage(action.payload);
                    break;

                default:
                    return false;
            }
        });
    }

    subscribe (callback) {
        this.on('change', callback);
    }

    unsubscribe (callback) {
        this.removeListener('change', callback);
    }

    update () {
        this.emit('change');
    }

    getState () {
        return this.state;
    }

    getCurrentPage () {
        return this.state.currentPage;
    }

    changePage (newPage) {
        this.state.currentPage = newPage; // обновляем состояние

        this.update();
    }
}();
