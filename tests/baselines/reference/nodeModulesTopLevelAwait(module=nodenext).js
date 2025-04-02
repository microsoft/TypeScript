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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = await 1;
exports.x = x;
for await (const y of []) { }
//// [index.js]
// esm format file
const x = await 1;
export { x };
for await (const y of []) { }


//// [index.d.ts]
declare const x = 1;
export { x };
//// [index.d.ts]
declare const x = 1;
export { x };
