// @module: node12,nodenext
// @declaration: true
// @filename: subfolder/index.ts
// cjs format file
const x = import.meta.url;
export {x};
// @filename: index.ts
// esm format file
const x = import.meta.url;
export {x};
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