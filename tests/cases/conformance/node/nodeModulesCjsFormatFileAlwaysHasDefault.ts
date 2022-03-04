// @module: node12,nodenext
// @declaration: true
// @filename: subfolder/index.ts
// cjs format file
export const a = 1;
// @filename: index.ts
// esm format file
import mod from "./subfolder/index.js";
mod;
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