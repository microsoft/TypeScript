//// [tests/cases/compiler/contextualParameterDefaultReferenceCheckOrder.ts] ////

//// [contextualParameterDefaultReferenceCheckOrder.ts]
// x is contextually typed as 1, but its initializer widens it to number. The
// reference to x must have the same type whether it is queried before or
// after the function is checked.

const f: (g: () => number, x: 1) => void = (g = () => x, x = 0) => {};


//// [contextualParameterDefaultReferenceCheckOrder.js]
"use strict";
// x is contextually typed as 1, but its initializer widens it to number. The
// reference to x must have the same type whether it is queried before or
// after the function is checked.
const f = (g = () => x, x = 0) => { };
