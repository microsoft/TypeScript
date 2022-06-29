//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsImportMeta.ts] ////

//// [index.js]
// cjs format file
const x = import.meta.url;
export {x};
//// [index.js]
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
// cjs format file
const x = import.meta.url;
exports.x = x;
//// [index.js]
// esm format file
const x = import.meta.url;
export { x };


//// [index.d.ts]
export const x: string;
//// [index.d.ts]
export const x: string;
