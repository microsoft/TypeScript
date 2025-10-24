//// [tests/cases/conformance/jsdoc/checkJsdocTypedefOnlySourceFile.ts] ////

//// [0.js]
// @ts-check

var exports = {};

/**
 * @typedef {string}
 */
exports.SomeName;

/** @type {exports.SomeName} */
const myString = 'str';


//// [0.js]
"use strict";
// @ts-check
Object.defineProperty(exports, "__esModule", { value: true });
var exports = {};
/**
 * @typedef {string}
 */
exports.SomeName;
/** @type {exports.SomeName} */
const myString = 'str';
