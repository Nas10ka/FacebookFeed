export const token = '@#jlj2jldfjKSDFJks';
export const successMessage = 'The request has been succeed.';
export const errorMessage = 'Error!';
export const error = new Error(errorMessage);
export const profile = {
    firstName: 'John',
    lastName:  'Snow',
    token,
};

export const responseData = {
    data:    profile,
    message: successMessage,
};

export const responseDataFail = {
    message: errorMessage,
};

export const response = {
    status: 200,
    json:   () => Promise.resolve(responseData),
};
export const responseFail = {
    status: 401,
    json:   () => Promise.resolve(responseDataFail),
};
export const setup = () => {
    /* eslint-env node */
    global.fetch = jest.fn(() => Promise.resolve(response));
    global.localStorage = (() => {
        let storage = {};

        return {
            setItem: jest.fn((key, value) => {
                storage[key] = value;
            }),
            getItem:    jest.fn((key) => storage[key]),
            removeItem: jest.fn((key) => {
                delete storage[key];
            }),
            clear: jest.fn(() => {
                storage = {};
            }),
        };
    })();
};
