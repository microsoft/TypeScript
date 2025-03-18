//// [tests/cases/conformance/node/nodeModulesImportMeta.ts] ////

//// [index.ts]
// cjs format file
const x = import.meta.url;
export {x};
//// [index.ts]
// esm format file
const x = import.meta.url;
export {x};
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module"
}
//// [package.json]
{
    "type": "commonjs"
}

//// [index.js]
const x = import.meta.url;
export { x };
//// [index.js]
const x = import.meta.url;
export { x };
