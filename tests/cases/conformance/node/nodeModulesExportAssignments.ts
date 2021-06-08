// @module: node12,nodenext
// @declaration: true
// @filename: subfolder/index.ts
// cjs format file
const a = {};
export = a;
// @filename: index.ts
// esm format file
const a = {};
export = a;
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