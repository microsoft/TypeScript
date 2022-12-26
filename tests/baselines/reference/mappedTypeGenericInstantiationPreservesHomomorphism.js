//// [tests/cases/compiler/mappedTypeGenericInstantiationPreservesHomomorphism.ts] ////

//// [internal.ts]
export declare function usePrivateType<T extends unknown[]>(...args: T): PrivateMapped<T[any]>;

type PrivateMapped<Obj> = {[K in keyof Obj]: Obj[K]};

//// [api.ts]
import {usePrivateType} from './internal';
export const mappedUnionWithPrivateType = <T extends unknown[]>(...args: T) => usePrivateType(...args);


//// [internal.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [api.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mappedUnionWithPrivateType = void 0;
var internal_1 = require("./internal");
var mappedUnionWithPrivateType = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return internal_1.usePrivateType.apply(void 0, args);
};
exports.mappedUnionWithPrivateType = mappedUnionWithPrivateType;


//// [internal.d.ts]
export declare function usePrivateType<T extends unknown[]>(...args: T): PrivateMapped<T[any]>;
type PrivateMapped<Obj> = {
    [K in keyof Obj]: Obj[K];
};
export {};
//// [api.d.ts]
export declare const mappedUnionWithPrivateType: <T extends unknown[]>(...args: T) => T[any] extends infer T_1 ? { [K in keyof T_1]: T[any][K]; } : never;
