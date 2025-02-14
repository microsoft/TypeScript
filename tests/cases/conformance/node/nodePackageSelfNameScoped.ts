// @module: node16,node18,nodenext
// @declaration: true
// @filename: index.ts
// esm format file
import * as self from "@scope/package";
self;
// @filename: index.mts
// esm format file
import * as self from "@scope/package";
self;
// @filename: index.cts
// cjs format file
import * as self from "@scope/package";
self;
// @filename: package.json
{
    "name": "@scope/package",
    "private": true,
    "type": "module",
    "exports": "./index.js"
}