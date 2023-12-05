//// [tests/cases/conformance/node/nodeModulesExportAssignments.ts] ////

//// [index.ts]
// cjs format file
const a = {};
export = a;
//// [index.ts]
// esm format file
const a = {};
export = a;
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
// cjs format file
var a = {};
module.exports = a;
//// [index.js]
// esm format file
var a = {};
export {};


//// [index.d.ts]
declare const a: {};
export = a;
//// [index.d.ts]
declare const a: {};
export = a;
