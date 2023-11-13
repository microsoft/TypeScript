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

var y0: any = E2[1]
var name = "A";
var y1: any = E2[name];
var y2: any = E2[`${name}`];

var x: typeof E2 = E2;
var y: (typeof E2)[] = [E2];

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



//// [constEnumErrors.d.ts]
declare const enum E {
    A = 0
}
declare namespace E {
}
declare const enum E1 {
    X,
    Y,
    Y1
}
declare const enum E2 {
    A = 0
}
declare var y0: any;
declare var name: string;
declare var y1: any;
declare var y2: any;
declare var x: typeof E2;
declare var y: (typeof E2)[];
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

constEnumErrors.ts(1,12): error TS2567: Enum declarations can only merge with namespace or other enum declarations.
constEnumErrors.ts(5,8): error TS2567: Enum declarations can only merge with namespace or other enum declarations.
constEnumErrors.ts(12,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(12,9): error TS2651: A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums.
constEnumErrors.ts(14,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(14,9): error TS2474: const enum member initializers must be constant expressions.
constEnumErrors.ts(14,12): error TS2339: Property 'Z' does not exist on type 'typeof E1'.
constEnumErrors.ts(15,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(15,10): error TS2474: const enum member initializers must be constant expressions.
constEnumErrors.ts(15,13): error TS2339: Property 'Z' does not exist on type 'typeof E1'.
constEnumErrors.ts(22,18): error TS2476: A const enum member can only be accessed using a string literal.
constEnumErrors.ts(24,18): error TS2476: A const enum member can only be accessed using a string literal.
constEnumErrors.ts(25,18): error TS2476: A const enum member can only be accessed using a string literal.
constEnumErrors.ts(27,20): error TS2475: 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.
constEnumErrors.ts(28,25): error TS2475: 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.
constEnumErrors.ts(33,5): error TS2475: 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.
constEnumErrors.ts(37,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(38,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(39,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(40,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(41,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(41,9): error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
constEnumErrors.ts(42,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(42,9): error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
constEnumErrors.ts(43,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumErrors.ts(43,9): error TS2478: 'const' enum member initializer was evaluated to disallowed value 'NaN'.


==== constEnumErrors.ts (26 errors) ====
    const enum E {
               ~
!!! error TS2567: Enum declarations can only merge with namespace or other enum declarations.
        A
    }
    
    module E {
           ~
!!! error TS2567: Enum declarations can only merge with namespace or other enum declarations.
        var x = 1;
    }
    
    const enum E1 {
        // illegal case
        // forward reference to the element of the same enum
        X = Y,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~
!!! error TS2651: A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums.
        // forward reference to the element of the same enum
        Y = E1.Z,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~
!!! error TS2474: const enum member initializers must be constant expressions.
               ~
!!! error TS2339: Property 'Z' does not exist on type 'typeof E1'.
        Y1 = E1["Z"]
        ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~~~~~~~
!!! error TS2474: const enum member initializers must be constant expressions.
                ~~~
!!! error TS2339: Property 'Z' does not exist on type 'typeof E1'.
    }
    
    const enum E2 {
        A
    }
    
    var y0: any = E2[1]
                     ~
!!! error TS2476: A const enum member can only be accessed using a string literal.
    var name = "A";
    var y1: any = E2[name];
                     ~~~~
!!! error TS2476: A const enum member can only be accessed using a string literal.
    var y2: any = E2[`${name}`];
                     ~~~~~~~~~
!!! error TS2476: A const enum member can only be accessed using a string literal.
    
    var x: typeof E2 = E2;
                       ~~
!!! error TS2475: 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.
    var y: (typeof E2)[] = [E2];
                            ~~
!!! error TS2475: 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.
    
    function foo(t: any): void {
    }
    
    foo(E2);
        ~~
!!! error TS2475: 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.
    
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
            ~~~~~
!!! error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
        G = 1 / 0, // overflow
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~~
!!! error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
        H = 0 / 0  // NaN
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~~
!!! error TS2478: 'const' enum member initializer was evaluated to disallowed value 'NaN'.
    }