// @module: node12,nodenext
// @declaration: true
// @importHelpers: true
// @filename: subfolder/index.ts
// cjs format file
export * from "fs";
export * as fs from "fs";
// @filename: index.ts
// esm format file
export * from "fs";
export * as fs from "fs";
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module"
}
// @filename: subfolder/package.json
{
    "type": "commonjs"
}
// @filename: types.d.ts
declare module "fs";
declare module "tslib" {
    export {};
    // intentionally missing all helpers
}