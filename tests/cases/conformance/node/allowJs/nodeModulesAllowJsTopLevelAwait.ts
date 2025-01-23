// @module: node16,node18,nodenext
// @declaration: true
// @allowJs: true
// @checkJs: true
// @outDir: out
// @filename: subfolder/index.js
// cjs format file
const x = await 1;
export {x};
for await (const y of []) {}
// @filename: index.js
// esm format file
const x = await 1;
export {x};
for await (const y of []) {}
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