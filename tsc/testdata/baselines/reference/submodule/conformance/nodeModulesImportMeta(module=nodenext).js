//// [tests/cases/conformance/node/nodeModulesImportMeta.ts] ////

//// [index.ts]
// cjs format file
const x = import.meta.url;
export {x};
//// [index.ts]
// esm format file
const x = import.meta.url;
export {x};
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
exports.x = void 0;
const x = import.meta.url;
exports.x = x;
//// [index.js]
const x = import.meta.url;
export { x };
