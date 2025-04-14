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
exports.default = { fn: fn };
//// [reexport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
exports.default = { test: types_1.default };


//// [types.d.ts]
type Fns = Record<string, (...params: unknown[]) => unknown>;
type Map<T extends Fns> = {
    [K in keyof T]: T[K];
};
type AllArg<T extends Fns> = {
    [K in keyof T]: Parameters<T[K]>;
};
declare function fn<T extends {
    x: Map<T['x']>;
}>(sliceIndex: T): AllArg<T['x']>;
declare const _default: {
    fn: typeof fn;
};
export default _default;
//// [reexport.d.ts]
declare const _default: {
    test: {
        fn: <T extends {
            x: T["x"] extends infer T_1 extends {
                [x: string]: (...params: unknown[]) => unknown;
            } ? { [K in keyof T_1]: T["x"][K]; } : never;
        }>(sliceIndex: T) => T["x"] extends infer T_2 extends {
            [x: string]: (...params: unknown[]) => unknown;
        } ? { [K_1 in keyof T_2]: Parameters<T["x"][K_1]>; } : never;
    };
};
export default _default;
