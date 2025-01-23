// @module: node16,node18,nodenext
// @declaration: true
// @importHelpers: true
// @allowJs: true
// @checkJs: true
// @outDir: out
// @filename: subfolder/index.ts
// cjs format file
export * from "fs";
export * as fs from "fs";
// @filename: index.js
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