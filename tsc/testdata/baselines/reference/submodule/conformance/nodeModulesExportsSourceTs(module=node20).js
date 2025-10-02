//// [tests/cases/conformance/node/nodeModulesExportsSourceTs.ts] ////

//// [index.ts]
// esm format file
import { Thing } from "inner/other";
export const a = (await import("inner")).x();
import {a as a2} from "package";
//// [index.ts]
// esm format file
export { x } from "./other.js";
//// [other.ts]
// esm format file
export interface Thing {}
export const x: () => Thing = null as any;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "./index.ts"
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "type": "module",
    "exports": "./index.ts"
}

//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = null;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// esm format file
const other_js_1 = require("./other.js");
Object.defineProperty(exports, "x", { enumerable: true, get: function () { return other_js_1.x; } });
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = (await import("inner")).x();


//// [other.d.ts]
export interface Thing {
}
export declare const x: () => Thing;
//// [index.d.ts]
export { x } from "./other.js";
//// [index.d.ts]
export declare const a: any;
