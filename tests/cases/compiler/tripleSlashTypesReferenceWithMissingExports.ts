// @module: commonjs,node16,node18,nodenext
// @filename: node_modules/pkg/index.d.ts
interface GlobalThing { a: number }
// @filename: node_modules/pkg/package.json
{
    "name": "pkg",
    "types": "index.d.ts",
    "exports": "some-other-thing.js"
}
// @filename: usage.ts
/// <reference types="pkg" />

const a: GlobalThing = { a: 0 };