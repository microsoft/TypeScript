//// [tests/cases/conformance/node/nodeModulesTopLevelAwait.ts] ////

//// [index.ts]
// cjs format file
const x = await 1;
export {x};
for await (const y of []) {}
//// [index.ts]
// esm format file
const x = await 1;
export {x};
for await (const y of []) {}
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
const x = await 1;
export { x };
for await (const y of []) { }
//// [index.js]
const x = await 1;
export { x };
for await (const y of []) { }
