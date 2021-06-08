// @module: node12,nodenext
// @filename: subfolder/index.ts
// cjs format file
const x = 1;
export {x};
// @filename: subfolder2/index.ts
// cjs format file
const x = 1;
export {x};
// @filename: subfolder2/another/index.ts
// esm format file
const x = 1;
export {x};
// @filename: index.ts
// esm format file
const x = 1;
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
// @filename: subfolder2/package.json
{
}
// @filename: subfolder2/another/package.json
{
    "type": "module"
}