//// [tests/cases/conformance/es6/destructuring/emptyArrayBindingPattern01.ts] ////

//// [emptyArrayBindingPattern01.ts]
export const cilBlurLinear1: string[][] = [[]];
const [,] = cilBlurLinear1;

export const cilBlurLinear2: string[][] = [[]];
let [,] = cilBlurLinear2;

export const cilBlurLinear3: string[][] = [[]];
var [,] = cilBlurLinear3;

export const cilBlurLinear4: string[][] = [[]];
const [[]] = cilBlurLinear4;

export const cilBlurLinear5: string[][] = [[]];
let [[]] = cilBlurLinear5;

export const cilBlurLinear6: string[][] = [[]];
var [[]] = cilBlurLinear6;


//// [emptyArrayBindingPattern01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cilBlurLinear6 = exports.cilBlurLinear5 = exports.cilBlurLinear4 = exports.cilBlurLinear3 = exports.cilBlurLinear2 = exports.cilBlurLinear1 = void 0;
exports.cilBlurLinear1 = [[]];
exports.cilBlurLinear2 = [[]];
exports.cilBlurLinear3 = [[]];
exports.cilBlurLinear4 = [[]];
var _a = exports.cilBlurLinear4[0];
exports.cilBlurLinear5 = [[]];
var _b = exports.cilBlurLinear5[0];
exports.cilBlurLinear6 = [[]];
var _c = exports.cilBlurLinear6[0];
