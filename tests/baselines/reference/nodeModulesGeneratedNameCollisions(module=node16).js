//// [tests/cases/conformance/node/nodeModulesGeneratedNameCollisions.ts] ////

//// [index.ts]
// cjs format file
function require() {}
const exports = {};
class Object {}
export const __esModule = false;
export {require, exports, Object};
//// [index.ts]
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
exports.Object = exports.exports = exports.__esModule = void 0;
exports.require = require;
// cjs format file
function require() { }
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
declare function require(): void;
declare const exports: {};
declare class Object {
}
export declare const __esModule = false;
export { require, exports, Object };
//// [index.d.ts]
declare function require(): void;
declare const exports: {};
declare class Object {
}
export declare const __esModule = false;
export { require, exports, Object };
