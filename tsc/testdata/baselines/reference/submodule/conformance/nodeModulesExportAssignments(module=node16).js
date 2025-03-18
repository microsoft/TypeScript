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
const a = {};
export {};
//// [index.js]
const a = {};
export {};
