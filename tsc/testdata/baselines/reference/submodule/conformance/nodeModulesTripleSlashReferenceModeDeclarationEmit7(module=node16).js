//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeDeclarationEmit7.ts] ////

//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": {
        "import": "./import.js",
        "require": "./require.js"
    }
}
//// [import.d.ts]
export {};
declare global {
    interface ImportInterface { _i: any; }
    function getInterI(): ImportInterface;
}
//// [require.d.ts]
export {};
declare global {
    interface RequireInterface { _r: any; }
    function getInterR(): RequireInterface;
}
//// [uses.ts]
/// <reference types="pkg" preserve="true" />
export default getInterI();
//// [package.json]
{
    "private": true,
    "type": "module"
}
//// [uses.ts]
/// <reference types="pkg" preserve="true" />
export default getInterR();
//// [package.json]
{
    "private": true,
    "type": "commonjs"
}
//// [package.json]
{
    "private": true,
    "type": "module"
}
//// [index.ts]
// only an esm file can `import` both kinds of files
import obj1 from "./sub1/uses.js"
import obj2 from "./sub2/uses.js"
export default [obj1, obj2.default] as const;

//// [uses.js]
export default getInterI();
//// [uses.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getInterR();
//// [index.js]
import obj1 from "./sub1/uses.js";
import obj2 from "./sub2/uses.js";
export default [obj1, obj2.default];
