//// [tests/cases/compiler/constEnumErrors.ts] ////

//// [constEnumErrors.ts]
const enum E {
    A
}

module E {
    var x = 1;
}

const enum E1 {
    // illegal case
    // forward reference to the element of the same enum
    X = Y,
    // forward reference to the element of the same enum
    Y = E1.Z,
    Y1 = E1["Z"]
}

const enum E2 {
    A
}

var y0 = E2[1]
var name = "A";
var y1 = E2[name];
var y2 = E2[`${name}`];

var x = E2;
var y = [E2];

function foo(t: any): void {
}

foo(E2);

const enum NaNOrInfinity {
    A = 9007199254740992,
    B = A * A,
    C = B * B,
    D = C * C,
    E = D * D,
    F = E * E, // overflow
    G = 1 / 0, // overflow
    H = 0 / 0  // NaN
}

/// [Declarations] ////



//// [/.src/constEnumErrors.d.ts]
declare const enum E {
    A = 0
}
declare namespace E {
}
declare const enum E1 {
    X = 0,
    Y,
    Y1
}
declare const enum E2 {
    A = 0
}
declare var y0: invalid;
declare var name: string;
declare var y1: invalid;
declare var y2: invalid;
declare var x: invalid;
declare var y: invalid;
declare function foo(t: any): void;
declare const enum NaNOrInfinity {
    A = 9007199254740992,
    B = 8.112963841460668e+31,
    C = 6.582018229284824e+63,
    D = 4.332296397063773e+127,
    E = 1.876879207201175e+255,
    F = Infinity,// overflow
    G = Infinity,// overflow
    H = NaN
}
/// [Errors] ////

constEnumErrors.ts(12,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(14,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(15,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(22,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(24,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(25,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(27,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(28,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(37,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(38,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(39,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(40,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(41,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(42,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(43,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== constEnumErrors.ts (15 errors) ====
    const enum E {
        A
    }
    
    module E {
        var x = 1;
    }
    
    const enum E1 {
        // illegal case
        // forward reference to the element of the same enum
        X = Y,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        // forward reference to the element of the same enum
        Y = E1.Z,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        Y1 = E1["Z"]
        ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    const enum E2 {
        A
    }
    
    var y0 = E2[1]
             ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    var name = "A";
    var y1 = E2[name];
             ~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    var y2 = E2[`${name}`];
             ~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
    var x = E2;
            ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    var y = [E2];
            ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
    function foo(t: any): void {
    }
    
    foo(E2);
    
    const enum NaNOrInfinity {
        A = 9007199254740992,
        B = A * A,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        C = B * B,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        D = C * C,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        E = D * D,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        F = E * E, // overflow
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        G = 1 / 0, // overflow
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        H = 0 / 0  // NaN
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }