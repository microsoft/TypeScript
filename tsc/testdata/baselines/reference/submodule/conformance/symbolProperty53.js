//// [tests/cases/conformance/es6/Symbols/symbolProperty53.ts] ////

//// [symbolProperty53.ts]
var obj = {
    [Symbol.for]: 0
};

obj[Symbol.for];

//// [symbolProperty53.js]
"use strict";
var obj = {
    [Symbol.for]: 0
};
obj[Symbol.for];
