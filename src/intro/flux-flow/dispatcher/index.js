export default new class dispatcher {
    constructor () {
        this.__listeners = [];
    }

    dispatch (action) {
        // выбирает action и запускает его - в параметре передаем
        //.. названия action

        this.__listeners.forEach((listener) => listener(action));
    }

    register (listener) {
        // register записывает слушатели в массив, которые позже будут вызываться
        this.__listeners.push(listener);
    }
}();
