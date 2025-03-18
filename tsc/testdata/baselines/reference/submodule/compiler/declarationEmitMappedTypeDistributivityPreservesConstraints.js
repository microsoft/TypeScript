//// [tests/cases/compiler/declarationEmitMappedTypeDistributivityPreservesConstraints.ts] ////

//// [types.ts]
type Fns = Record<string, (...params: unknown[]) => unknown>

type Map<T extends Fns> = { [K in keyof T]: T[K]; };

type AllArg<T extends Fns> = { [K in keyof T]: Parameters<T[K]> };

function fn<T extends { x: Map<T['x']> }>(sliceIndex: T): AllArg<T['x']> {
    return null!;
}

export default { fn };

//// [reexport.ts]
import test from "./types";
export default { test };

//// [types.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fn(sliceIndex) {
    return null;
}
exports.default = { fn };
//// [reexport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.default = { test: types_1.default };
