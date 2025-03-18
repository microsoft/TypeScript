//// [tests/cases/conformance/node/nodeModulesCjsFormatFileAlwaysHasDefault.ts] ////

//// [index.ts]
// cjs format file
export const a = 1;
//// [index.ts]
// esm format file
import mod from "./subfolder/index.js";
mod;
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
export const a = 1;
//// [index.js]
import mod from "./subfolder/index.js";
mod;
