// @module: node16,node18,nodenext
// @declaration: true
// @filename: subfolder/index.ts
// cjs format file
const x = await 1;
export {x};
for await (const y of []) {}
// @filename: index.ts
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