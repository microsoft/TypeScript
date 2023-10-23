//// [tests/cases/compiler/isolatedModulesGlobalNamespacesAndEnums.ts] ////

//// [script-namespaces.ts]
namespace Instantiated {
    export const x = 1;
}
namespace Uninstantiated {
    export type T = number;
}
declare namespace Ambient {
    export const x: number;
}

//// [module-namespaces.ts]
export namespace Instantiated {
    export const x = 1;
}

//// [enum1.ts]
enum Enum { A, B, C }
declare enum Enum { X = 1_000_000 }
const d = 'd';

//// [enum2.ts]
enum Enum {
    D = d,
    E = A, // error
    Y = X, // error
    Z = Enum.A
}

declare enum Enum {
    F = A
}

/// [Declarations] ////



//// [/.src/enum1.d.ts]
declare enum Enum {
    A = 0,
    B = 1,
    C = 2
}
declare enum Enum {
    X = 1000000
}
declare const d = "d";

//// [/.src/enum2.d.ts]
declare enum Enum {
    D,
    E,// error
    Y,// error
    Z
}
declare enum Enum {
    F
}

//// [/.src/module-namespaces.d.ts]
export declare namespace Instantiated {
    const x = 1;
}

//// [/.src/script-namespaces.d.ts]
declare namespace Instantiated {
    const x = 1;
}
declare namespace Uninstantiated {
    type T = number;
}
declare namespace Ambient {
    const x: number;
}
/// [Errors] ////

enum2.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enum2.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enum2.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enum2.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enum2.ts(9,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== script-namespaces.ts (0 errors) ====
    namespace Instantiated {
        export const x = 1;
    }
    namespace Uninstantiated {
        export type T = number;
    }
    declare namespace Ambient {
        export const x: number;
    }
    
==== module-namespaces.ts (0 errors) ====
    export namespace Instantiated {
        export const x = 1;
    }
    
==== enum1.ts (0 errors) ====
    enum Enum { A, B, C }
    declare enum Enum { X = 1_000_000 }
    const d = 'd';
    
==== enum2.ts (5 errors) ====
    enum Enum {
        D = d,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        E = A, // error
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        Y = X, // error
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        Z = Enum.A
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    declare enum Enum {
        F = A
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }