//// [tests/cases/compiler/mixedTypeEnumComparison.ts] ////

//// [mixedTypeEnumComparison.ts]
const enum E {
    S1 = "foo",
    S2 = "bar",

    N1 = 1000,
    N2 = 25,
}

declare var someNumber: number

if (someNumber > E.N2) {
    someNumber = E.N2;
}

declare const unionOfEnum: E.N1 | E.N2;

if (someNumber > unionOfEnum) {
    someNumber = E.N2;
}

declare var someString: string

if (someString > E.S1) {
    someString = E.S2;
}


declare function someValue(): number;

enum E2 {
    S1 = "foo",
    N1 = 1000,
    C1 = someValue(),
}

someString > E2.S1;
someNumber > E2.N1;
someNumber > E2.C1;


/// [Declarations] ////



//// [mixedTypeEnumComparison.d.ts]
declare const enum E {
    S1 = "foo",
    S2 = "bar",
    N1 = 1000,
    N2 = 25
}
declare var someNumber: number;
declare const unionOfEnum: E.N1 | E.N2;
declare var someString: string;
declare function someValue(): number;
declare enum E2 {
    S1 = "foo",
    N1 = 1000,
    C1
}
/// [Errors] ////

mixedTypeEnumComparison.ts(33,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== mixedTypeEnumComparison.ts (1 errors) ====
    const enum E {
        S1 = "foo",
        S2 = "bar",
    
        N1 = 1000,
        N2 = 25,
    }
    
    declare var someNumber: number
    
    if (someNumber > E.N2) {
        someNumber = E.N2;
    }
    
    declare const unionOfEnum: E.N1 | E.N2;
    
    if (someNumber > unionOfEnum) {
        someNumber = E.N2;
    }
    
    declare var someString: string
    
    if (someString > E.S1) {
        someString = E.S2;
    }
    
    
    declare function someValue(): number;
    
    enum E2 {
        S1 = "foo",
        N1 = 1000,
        C1 = someValue(),
        ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    someString > E2.S1;
    someNumber > E2.N1;
    someNumber > E2.C1;
    