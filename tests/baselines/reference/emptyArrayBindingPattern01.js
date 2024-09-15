//// [tests/cases/conformance/es6/destructuring/emptyArrayBindingPattern01.ts] ////

//// [emptyArrayBindingPattern01.ts]
export const cilBlurLinear: string[][] = [[]];

const [,] = cilBlurLinear;

let [,] = cilBlurLinear;

var [,] = cilBlurLinear;

const [[]] = cilBlurLinear;

let [[]] = cilBlurLinear;

var [[]] = cilBlurLinear;


//// [emptyArrayBindingPattern01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cilBlurLinear = void 0;
exports.cilBlurLinear = [[]];
var _a = exports.cilBlurLinear[0];
var _b = exports.cilBlurLinear[0];
var _c = exports.cilBlurLinear[0];
