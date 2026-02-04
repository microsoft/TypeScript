//// [tests/cases/conformance/es6/Symbols/symbolProperty52.ts] ////

//// [symbolProperty52.ts]
var obj = {
    [Symbol.nonsense]: 0
};

obj = {};

obj[Symbol.nonsense];

//// [symbolProperty52.js]
"use strict";
var obj = {
    [Symbol.nonsense]: 0
};
obj = {};
obj[Symbol.nonsense];
