//// [tests/cases/compiler/unionErrorMessageOnMatchingDiscriminant.ts] ////

//// [unionErrorMessageOnMatchingDiscriminant.ts]
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

//// [unionErrorMessageOnMatchingDiscriminant.js]
"use strict";
// error
var foo = {
    type: 'a',
    data: null
};
