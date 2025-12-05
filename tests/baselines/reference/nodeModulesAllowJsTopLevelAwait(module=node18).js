//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsTopLevelAwait.ts] ////

//// [index.js]
// cjs format file
const x = await 1;
export {x};
for await (const y of []) {}
//// [index.js]
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
export const x: 1;
//// [index.d.ts]
export const x: 1;
