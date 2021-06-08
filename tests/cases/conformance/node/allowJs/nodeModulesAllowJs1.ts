// @module: node12,nodenext
// @declaration: true
// @allowJs: true
// @checkJs: true
// @outDir: out
// @filename: subfolder/index.js
// cjs format file
const x = 1;
export {x};
// @filename: subfolder2/index.js
// cjs format file
const x = 1;
export {x};
// @filename: subfolder2/another/index.js
// esm format file
const x = 1;
export {x};
// @filename: index.js
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