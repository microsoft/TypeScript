// @module: node12,nodenext
// @declaration: true
// @filename: subfolder/index.ts
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
// @filename: subfolder/index.cts
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
// @filename: subfolder/index.mts
// esm format file
const x = <T>() => <T><any>(void 0);
export {x};
// @filename: subfolder2/index.ts
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
// @filename: subfolder2/index.cts
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
// @filename: subfolder2/index.mts
// esm format file
const x = <T>() => <T><any>(void 0);
export {x};
// @filename: subfolder2/another/index.ts
// esm format file
const x = <T>() => <T><any>(void 0);
export {x};
// @filename: subfolder2/another/index.mts
// esm format file
const x = <T>() => <T><any>(void 0);
export {x};
// @filename: subfolder2/another/index.cts
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
// @filename: index.mts
// esm format file
const x = <T>() => <T><any>(void 0);
export {x};
// @filename: index.cts
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
// @filename: index.ts
// esm format file
const x = <T>() => <T><any>(void 0);
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