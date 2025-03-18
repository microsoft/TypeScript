//// [tests/cases/conformance/node/nodeModulesImportHelpersCollisions3.ts] ////

//// [index.ts]
// cjs format file
export {default} from "fs";
//// [index.ts]
// esm format file
export {default} from "fs";
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
export { default } from "fs";
//// [index.js]
export { default } from "fs";
