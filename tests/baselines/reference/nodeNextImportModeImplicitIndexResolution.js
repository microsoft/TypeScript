//// [tests/cases/compiler/nodeNextImportModeImplicitIndexResolution.ts] ////

//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1"
}
//// [index.d.ts]
export const item = 4;
//// [package.json]
{
    "private": true
}
//// [index.d.ts]
export const item = 4;
//// [package.json]
{
    "type": "module",
    "private": true
}
//// [index.ts]
import { item } from "pkg"; // should work (`index.js` is assumed to be the entrypoint for packages found via nonrelative import)
import { item as item2 } from "./pkg";  // shouldn't work (`index.js` is _not_ assumed to be the entrypoint for packages found via relative import)
import { item as item3 } from "./node_modules/pkg" // _even if they're in a node_modules folder_


//// [index.js]
export {};
