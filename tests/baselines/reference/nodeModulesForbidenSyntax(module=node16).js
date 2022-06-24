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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = () => (void 0);
exports.x = x;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = () => (void 0);
exports.x = x;
//// [index.mjs]
// esm format file
const x = () => (void 0);
export { x };
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = () => (void 0);
exports.x = x;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = () => (void 0);
exports.x = x;
//// [index.mjs]
// esm format file
const x = () => (void 0);
export { x };
//// [index.js]
// esm format file
const x = () => (void 0);
export { x };
//// [index.mjs]
// esm format file
const x = () => (void 0);
export { x };
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = () => (void 0);
exports.x = x;
//// [index.mjs]
// esm format file
const x = () => (void 0);
export { x };
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = () => (void 0);
exports.x = x;
//// [index.js]
// esm format file
const x = () => (void 0);
export { x };


//// [index.d.ts]
declare const x: <T>() => T;
export { x };
//// [index.d.cts]
declare const x: <T>() => T;
export { x };
//// [index.d.mts]
declare const x: <T>() => T;
export { x };
//// [index.d.ts]
declare const x: <T>() => T;
export { x };
//// [index.d.cts]
declare const x: <T>() => T;
export { x };
//// [index.d.mts]
declare const x: <T>() => T;
export { x };
//// [index.d.ts]
declare const x: <T>() => T;
export { x };
//// [index.d.mts]
declare const x: <T>() => T;
export { x };
//// [index.d.cts]
declare const x: <T>() => T;
export { x };
//// [index.d.mts]
declare const x: <T>() => T;
export { x };
//// [index.d.cts]
declare const x: <T>() => T;
export { x };
//// [index.d.ts]
declare const x: <T>() => T;
export { x };
