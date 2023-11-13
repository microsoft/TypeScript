//// [tests/cases/compiler/declarationEmitDestructuringParameterProperties.ts] ////

//// [declarationEmitDestructuringParameterProperties.ts]
class C1 {
    constructor(public [x, y, z]: string[]) {
    }
}

type TupleType1 =[string, number, boolean];
class C2 {
    constructor(public [x, y, z]: TupleType1) {
    }
}

type ObjType1 = { x: number; y: string; z: boolean }
class C3 {
    constructor(public { x, y, z }: ObjType1) {
    }
}

/// [Declarations] ////



//// [declarationEmitDestructuringParameterProperties.d.ts]
declare class C1 {
    x: invalid;
    y: invalid;
    z: invalid;
    constructor([x, y, z]: string[]);
}
type TupleType1 = [string, number, boolean];
declare class C2 {
    x: invalid;
    y: invalid;
    z: invalid;
    constructor([x, y, z]: TupleType1);
}
type ObjType1 = {
    x: number;
    y: string;
    z: boolean;
};
declare class C3 {
    x: invalid;
    y: invalid;
    z: invalid;
    constructor({ x, y, z }: ObjType1);
}
/// [Errors] ////

declarationEmitDestructuringParameterProperties.ts(2,17): error TS1187: A parameter property may not be declared using a binding pattern.
declarationEmitDestructuringParameterProperties.ts(2,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitDestructuringParameterProperties.ts(2,28): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitDestructuringParameterProperties.ts(2,31): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitDestructuringParameterProperties.ts(8,17): error TS1187: A parameter property may not be declared using a binding pattern.
declarationEmitDestructuringParameterProperties.ts(8,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitDestructuringParameterProperties.ts(8,28): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitDestructuringParameterProperties.ts(8,31): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitDestructuringParameterProperties.ts(14,17): error TS1187: A parameter property may not be declared using a binding pattern.
declarationEmitDestructuringParameterProperties.ts(14,26): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitDestructuringParameterProperties.ts(14,29): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
declarationEmitDestructuringParameterProperties.ts(14,32): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== declarationEmitDestructuringParameterProperties.ts (12 errors) ====
    class C1 {
        constructor(public [x, y, z]: string[]) {
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS1187: A parameter property may not be declared using a binding pattern.
                            ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                               ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                  ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
    }
    
    type TupleType1 =[string, number, boolean];
    class C2 {
        constructor(public [x, y, z]: TupleType1) {
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS1187: A parameter property may not be declared using a binding pattern.
                            ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                               ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                  ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
    }
    
    type ObjType1 = { x: number; y: string; z: boolean }
    class C3 {
        constructor(public { x, y, z }: ObjType1) {
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS1187: A parameter property may not be declared using a binding pattern.
                             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                   ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
    }