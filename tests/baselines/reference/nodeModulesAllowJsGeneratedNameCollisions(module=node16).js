//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsGeneratedNameCollisions.ts] ////

//// [index.js]
// cjs format file
function require() {}
const exports = {};
class Object {}
export const __esModule = false;
export {require, exports, Object};
//// [index.js]
// esm format file
function require() {}
const exports = {};
class Object {}
export const __esModule = false;
export {require, exports, Object};
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module"
}
//// [package.json]
{
    "type": "commonjs"
}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Object = exports.exports = exports.require = exports.__esModule = void 0;
// cjs format file
function require() { }
exports.require = require;
const exports = {};
exports.exports = exports;
class Object {
}
exports.Object = Object;
exports.__esModule = false;
//// [index.js]
// esm format file
function require() { }
const exports = {};
class Object {
}
export const __esModule = false;
export { require, exports, Object };


//// [index.d.ts]
export const __esModule: false;
export function require(): void;
export const exports: {};
export class Object {
}
//// [index.d.ts]
export const __esModule: false;
export function require(): void;
export const exports: {};
export class Object {
}
