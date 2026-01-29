//// [tests/cases/compiler/mappedTypeGenericInstantiationPreservesHomomorphism.ts] ////

//// [internal.ts]
export declare function usePrivateType<T extends unknown[]>(...args: T): PrivateMapped<T[any]>;

type PrivateMapped<Obj> = {[K in keyof Obj]: Obj[K]};

//// [api.ts]
import {usePrivateType} from './internal';
export const mappedUnionWithPrivateType = <T extends unknown[]>(...args: T) => usePrivateType(...args);


//// [internal.js]
export {};
//// [api.js]
import { usePrivateType } from './internal';
export const mappedUnionWithPrivateType = (...args) => usePrivateType(...args);


//// [internal.d.ts]
export declare function usePrivateType<T extends unknown[]>(...args: T): PrivateMapped<T[any]>;
type PrivateMapped<Obj> = {
    [K in keyof Obj]: Obj[K];
};
export {};
//// [api.d.ts]
export declare const mappedUnionWithPrivateType: <T extends unknown[]>(...args: T) => T[any] extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never;
