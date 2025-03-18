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
function require() { }
const exports = {};
class Object {
}
export const __esModule = false;
export { require, exports, Object };
//// [index.js]
function require() { }
const exports = {};
class Object {
}
export const __esModule = false;
export { require, exports, Object };
