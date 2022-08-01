//// [tests/cases/conformance/salsa/requireAsDeclaredFunction.ts] ////

//// [first.js]
/**
 * @param {string} str
 * @return {number}
 */
function require(str) { return str.length }
const someModule = require("google-closure-compiler");
export {someModule};
//// [last.js]
const someModule = require("google-closure-compiler");
/**
 * @param {string} str
 * @return {number}
 */
function require(str) { return str.length }
export {someModule};
//// [global.js]
/**
 * @param {string} str
 * @return {number}
 */
function require(str) { return str.length }
const someModule = require("google-closure-compiler");

//// [main.ts]
import { someModule as m1 } from './first'
import { someModule as m2 } from './last'


//// [first.js]
"use strict";
exports.__esModule = true;
exports.someModule = void 0;
/**
 * @param {string} str
 * @return {number}
 */
function require(str) { return str.length; }
var someModule = require("google-closure-compiler");
exports.someModule = someModule;
//// [last.js]
"use strict";
exports.__esModule = true;
exports.someModule = void 0;
var someModule = require("google-closure-compiler");
exports.someModule = someModule;
/**
 * @param {string} str
 * @return {number}
 */
function require(str) { return str.length; }
//// [global.js]
/**
 * @param {string} str
 * @return {number}
 */
function require(str) { return str.length; }
var someModule = require("google-closure-compiler");
//// [main.js]
"use strict";
exports.__esModule = true;


//// [first.d.ts]
export const someModule: number;
//// [last.d.ts]
export const someModule: number;
//// [global.d.ts]
export {};
//// [main.d.ts]
export {};
