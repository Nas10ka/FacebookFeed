import { compose } from 'redux';

const func1 = (a, b) => {
    console.log('1: composition start');

    return a + b;
};

const func2 = (returnedValue) => {
    console.log('2: composition progressing');

    return returnedValue ** returnedValue;
};

const func3 = (returnedValue) => {
    console.log('3: composition ends');

    return `${returnedValue} ✓`;
};

console.log('•λ•', compose(func3, func2, func1)(2, 3));
