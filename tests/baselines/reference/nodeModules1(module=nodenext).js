//// [tests/cases/conformance/node/nodeModules1.ts] ////

//// [index.ts]
// cjs format file
const x = 1;
export {x};
//// [index.ts]
// cjs format file
const x = 1;
export {x};
//// [index.ts]
// esm format file
const x = 1;
export {x};
//// [index.ts]
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
declare const x = 1;
export { x };
//// [index.d.ts]
declare const x = 1;
export { x };
//// [index.d.ts]
declare const x = 1;
export { x };
//// [index.d.ts]
declare const x = 1;
export { x };
