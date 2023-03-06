// @module: nodenext
// @filename: node_modules/pkg/package.json
{
    "name": "pkg",
    "version": "0.0.1"
}
// @filename: node_modules/pkg/index.d.ts
export const item = 4;
// @filename: pkg/package.json
{
    "private": true
}
// @filename: pkg/index.d.ts
export const item = 4;
// @filename: package.json
{
    "type": "module",
    "private": true
}
// @filename: index.ts
import { item } from "pkg"; // should work (`index.js` is assumed to be the entrypoint for packages found via nonrelative import)
import { item as item2 } from "./pkg";  // shouldn't work (`index.js` is _not_ assumed to be the entrypoint for packages found via relative import)
import { item as item3 } from "./node_modules/pkg" // _even if they're in a node_modules folder_
