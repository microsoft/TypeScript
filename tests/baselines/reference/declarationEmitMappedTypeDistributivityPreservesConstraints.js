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
exports.__esModule = true;
function fn(sliceIndex) {
    return null;
}
exports["default"] = { fn: fn };
//// [reexport.js]
"use strict";
exports.__esModule = true;
var types_1 = require("./types");
exports["default"] = { test: types_1["default"] };


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
        fn: <T_1 extends {
            x: T_1["x"] extends infer T extends {
                [x: string]: (...params: unknown[]) => unknown;
            } ? { [K in keyof T]: T_1["x"][K]; } : never;
        }>(sliceIndex: T_1) => T_1["x"] extends infer T_2 extends {
            [x: string]: (...params: unknown[]) => unknown;
        } ? { [K_1 in keyof T_2]: Parameters<T_1["x"][K_1]>; } : never;
    };
};
export default _default;
