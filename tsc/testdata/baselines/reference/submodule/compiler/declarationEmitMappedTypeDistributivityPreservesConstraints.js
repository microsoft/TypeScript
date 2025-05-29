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
            x: T["x"] extends infer T_1 ? { [K in keyof T_1]: T["x"][K]; } : never;
        }>(sliceIndex: T) => T["x"] extends infer T_1 ? { [K in keyof T_1]: Parameters<T["x"][K]>; } : never;
    };
};
export default _default;


//// [DtsFileErrors]


reexport.d.ts(5,88): error TS2344: Type 'T["x"][K]' does not satisfy the constraint '(...args: any) => any'.
  Type 'T["x"][keyof T_1]' is not assignable to type '(...args: any) => any'.
    Type 'T["x"][string] | T["x"][number] | T["x"][symbol]' is not assignable to type '(...args: any) => any'.
      Type 'T["x"][string]' is not assignable to type '(...args: any) => any'.


==== types.d.ts (0 errors) ====
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
    
==== reexport.d.ts (1 errors) ====
    declare const _default: {
        test: {
            fn: <T extends {
                x: T["x"] extends infer T_1 ? { [K in keyof T_1]: T["x"][K]; } : never;
            }>(sliceIndex: T) => T["x"] extends infer T_1 ? { [K in keyof T_1]: Parameters<T["x"][K]>; } : never;
                                                                                           ~~~~~~~~~
!!! error TS2344: Type 'T["x"][K]' does not satisfy the constraint '(...args: any) => any'.
!!! error TS2344:   Type 'T["x"][keyof T_1]' is not assignable to type '(...args: any) => any'.
!!! error TS2344:     Type 'T["x"][string] | T["x"][number] | T["x"][symbol]' is not assignable to type '(...args: any) => any'.
!!! error TS2344:       Type 'T["x"][string]' is not assignable to type '(...args: any) => any'.
        };
    };
    export default _default;
    