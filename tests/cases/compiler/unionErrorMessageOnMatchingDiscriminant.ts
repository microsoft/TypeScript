// @strict: true
type A = {
    type: 'a',
    data: { a: string }
};

type B = {
    type: 'b',
    data: null
};

type C = {
    type: 'c',
    payload: string
};

type Union = A | B | C;

// error
const foo: Union = {
    type: 'a',
    data: null
};