//// [tests/cases/compiler/restElementWithNumberPropertyName.ts] ////

//// [restElementWithNumberPropertyName.ts]
const { 0: a, ...b } = [0, 1, 2];


//// [restElementWithNumberPropertyName.js]
const { 0: a, ...b } = [0, 1, 2];
