// @outDir: out/
// @declaration: true
// @checkJs: true
// @filename: first.js
/**
 * @param {string} str
 * @return {number}
 */
function require(str) { return str.length }
const someModule = require("google-closure-compiler");
export {someModule};
// @filename: last.js
const someModule = require("google-closure-compiler");
/**
 * @param {string} str
 * @return {number}
 */
function require(str) { return str.length }
export {someModule};
// @filename: global.js

/**
 * @param {string} str
 * @return {number}
 */
function require(str) { return str.length }
const someModule = require("google-closure-compiler");

// @filename: main.ts
import { someModule as m1 } from './first'
import { someModule as m2 } from './last'
