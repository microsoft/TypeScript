// @module: node16,node18,nodenext
// @declaration: true
// @filename: subfolder/index.ts
// cjs format file
function require() {}
const exports = {};
class Object {}
export const __esModule = false;
export {require, exports, Object};
// @filename: index.ts
// esm format file
function require() {}
const exports = {};
class Object {}
export const __esModule = false;
export {require, exports, Object};
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module"
}
// @filename: subfolder/package.json
{
    "type": "commonjs"
}