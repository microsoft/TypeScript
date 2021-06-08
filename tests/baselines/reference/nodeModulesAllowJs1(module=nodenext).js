//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJs1.ts] ////

//// [index.js]
// cjs format file
const x = 1;
export {x};
//// [index.js]
// cjs format file
const x = 1;
export {x};
//// [index.js]
// esm format file
const x = 1;
export {x};
//// [index.js]
// esm format file
const x = 1;
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = 1;
exports.x = x;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = 1;
exports.x = x;
//// [index.js]
// esm format file
const x = 1;
export { x };
//// [index.js]
// esm format file
const x = 1;
export { x };


//// [index.d.ts]
export const x: 1;
//// [index.d.ts]
export const x: 1;
//// [index.d.ts]
export const x: 1;
//// [index.d.ts]
export const x: 1;
