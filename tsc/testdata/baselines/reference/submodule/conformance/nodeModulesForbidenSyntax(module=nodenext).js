//// [tests/cases/conformance/node/nodeModulesForbidenSyntax.ts] ////

//// [index.ts]
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
//// [index.cts]
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
//// [index.mts]
// esm format file
const x = <T>() => <T><any>(void 0);
export {x};
//// [index.ts]
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
//// [index.cts]
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
//// [index.mts]
// esm format file
const x = <T>() => <T><any>(void 0);
export {x};
//// [index.ts]
// esm format file
const x = <T>() => <T><any>(void 0);
export {x};
//// [index.mts]
// esm format file
const x = <T>() => <T><any>(void 0);
export {x};
//// [index.cts]
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
//// [index.mts]
// esm format file
const x = <T>() => <T><any>(void 0);
export {x};
//// [index.cts]
// cjs format file
const x = <T>() => <T><any>(void 0);
export {x};
//// [index.ts]
// esm format file
const x = <T>() => <T><any>(void 0);
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
//// [package.json]
{
}
//// [package.json]
{
    "type": "module"
}

//// [index.js]
const x = () => (void 0);
export { x };
//// [index.cjs]
const x = () => (void 0);
export { x };
//// [index.mjs]
const x = () => (void 0);
export { x };
//// [index.js]
const x = () => (void 0);
export { x };
//// [index.cjs]
const x = () => (void 0);
export { x };
//// [index.mjs]
const x = () => (void 0);
export { x };
//// [index.js]
const x = () => (void 0);
export { x };
//// [index.mjs]
const x = () => (void 0);
export { x };
//// [index.cjs]
const x = () => (void 0);
export { x };
//// [index.mjs]
const x = () => (void 0);
export { x };
//// [index.cjs]
const x = () => (void 0);
export { x };
//// [index.js]
const x = () => (void 0);
export { x };
