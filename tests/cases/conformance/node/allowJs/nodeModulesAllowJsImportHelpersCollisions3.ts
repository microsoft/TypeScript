// @module: node16,node18,nodenext
// @target: es5
// @declaration: true
// @importHelpers: true
// @allowJs: true
// @checkJs: true
// @outDir: out
// @filename: subfolder/index.js
// cjs format file
export {default} from "fs";
export {default as foo} from "fs";
export {bar as baz} from "fs";
// @filename: index.js
// esm format file
export {default} from "fs";
export {default as foo} from "fs";
export {bar as baz} from "fs";
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