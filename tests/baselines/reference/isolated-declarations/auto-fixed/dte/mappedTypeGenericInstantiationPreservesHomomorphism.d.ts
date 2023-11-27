//// [tests/cases/compiler/mappedTypeGenericInstantiationPreservesHomomorphism.ts] ////

//// [internal.ts]
export declare function usePrivateType<T extends unknown[]>(...args: T): PrivateMapped<T[any]>;

type PrivateMapped<Obj> = {[K in keyof Obj]: Obj[K]};

//// [api.ts]
import {usePrivateType} from './internal';
export const mappedUnionWithPrivateType = <T extends unknown[]>(...args: T): T[any] extends infer T_1 ? { [K in keyof T_1]: T[any][K]; } : never => usePrivateType(...args);


/// [Declarations] ////



//// [api.d.ts]
export declare const mappedUnionWithPrivateType: <T extends unknown[]>(...args: T) => T[any] extends infer T_1 ? {
    [K in keyof T_1]: T[any][K];
} : never;
//# sourceMappingURL=api.d.ts.map
//// [internal.d.ts]
export declare function usePrivateType<T extends unknown[]>(...args: T): PrivateMapped<T[any]>;
type PrivateMapped<Obj> = {
    [K in keyof Obj]: Obj[K];
};
export {};
//# sourceMappingURL=internal.d.ts.map
/// [Errors] ////

api.ts(2,149): error TS2322: Type 'PrivateMapped<T[any]>' is not assignable to type 'T[any] extends infer T_1 ? { [K in keyof T_1]: T[any][K]; } : never'.


==== internal.ts (0 errors) ====
    export declare function usePrivateType<T extends unknown[]>(...args: T): PrivateMapped<T[any]>;
    
    type PrivateMapped<Obj> = {[K in keyof Obj]: Obj[K]};
    
==== api.ts (1 errors) ====
    import {usePrivateType} from './internal';
    export const mappedUnionWithPrivateType = <T extends unknown[]>(...args: T): T[any] extends infer T_1 ? { [K in keyof T_1]: T[any][K]; } : never => usePrivateType(...args);
                                                                                                                                                        ~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2322: Type 'PrivateMapped<T[any]>' is not assignable to type 'T[any] extends infer T_1 ? { [K in keyof T_1]: T[any][K]; } : never'.
    