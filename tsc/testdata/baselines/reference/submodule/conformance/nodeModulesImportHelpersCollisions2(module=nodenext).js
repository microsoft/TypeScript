//// [tests/cases/conformance/node/nodeModulesImportHelpersCollisions2.ts] ////

//// [index.ts]
// cjs format file
export * from "fs";
export * as fs from "fs";
//// [index.ts]
// esm format file
export * from "fs";
export * as fs from "fs";
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
//// [types.d.ts]
declare module "fs";
declare module "tslib" {
    export {};
    // intentionally missing all helpers
}

//// [index.js]
export * from "fs";
export * as fs from "fs";
//// [index.js]
export * from "fs";
export * as fs from "fs";
