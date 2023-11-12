//// [tests/cases/conformance/enums/enumConstantMembers.ts] ////

//// [enumConstantMembers.ts]
// Constant members allow negatives, but not decimals. Also hex literals are allowed
enum E1 {
    a = 1,
    b
}
enum E2 {
    a = - 1,
    b
}
enum E3 {
    a = 0.1,
    b // Error because 0.1 is not a constant
}

declare enum E4 {
    a = 1,
    b = -1,
    c = 0.1 // Not a constant
}

enum E5 {
    a = 1 / 0,
    b = 2 / 0.0,
    c = 1.0 / 0.0,
    d = 0.0 / 0.0,
    e = NaN,
    f = Infinity,
    g = -Infinity
}

const enum E6 {
    a = 1 / 0,
    b = 2 / 0.0,
    c = 1.0 / 0.0,
    d = 0.0 / 0.0,
    e = NaN,
    f = Infinity,
    g = -Infinity
}


/// [Declarations] ////



//// [/.src/enumConstantMembers.d.ts]
declare enum E1 {
    a = 1,
    b = 2
}
declare enum E2 {
    a = -1,
    b = 0
}
declare enum E3 {
    a = 0.1,
    b = 1.1
}
declare enum E4 {
    a = 1,
    b = -1,
    c = 0.1
}
declare enum E5 {
    a = Infinity,
    b = Infinity,
    c = Infinity,
    d = NaN,
    e,
    f,
    g
}
declare const enum E6 {
    a = Infinity,
    b = Infinity,
    c = Infinity,
    d = NaN,
    e,
    f,
    g
}
/// [Errors] ////

enumConstantMembers.ts(26,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMembers.ts(27,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMembers.ts(28,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMembers.ts(32,9): error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
enumConstantMembers.ts(33,9): error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
enumConstantMembers.ts(34,9): error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
enumConstantMembers.ts(35,9): error TS2478: 'const' enum member initializer was evaluated to disallowed value 'NaN'.
enumConstantMembers.ts(36,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMembers.ts(36,9): error TS2478: 'const' enum member initializer was evaluated to disallowed value 'NaN'.
enumConstantMembers.ts(37,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMembers.ts(37,9): error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
enumConstantMembers.ts(38,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumConstantMembers.ts(38,9): error TS2477: 'const' enum member initializer was evaluated to a non-finite value.


==== enumConstantMembers.ts (13 errors) ====
    // Constant members allow negatives, but not decimals. Also hex literals are allowed
    enum E1 {
        a = 1,
        b
    }
    enum E2 {
        a = - 1,
        b
    }
    enum E3 {
        a = 0.1,
        b // Error because 0.1 is not a constant
    }
    
    declare enum E4 {
        a = 1,
        b = -1,
        c = 0.1 // Not a constant
    }
    
    enum E5 {
        a = 1 / 0,
        b = 2 / 0.0,
        c = 1.0 / 0.0,
        d = 0.0 / 0.0,
        e = NaN,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        f = Infinity,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        g = -Infinity
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    const enum E6 {
        a = 1 / 0,
            ~~~~~
!!! error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
        b = 2 / 0.0,
            ~~~~~~~
!!! error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
        c = 1.0 / 0.0,
            ~~~~~~~~~
!!! error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
        d = 0.0 / 0.0,
            ~~~~~~~~~
!!! error TS2478: 'const' enum member initializer was evaluated to disallowed value 'NaN'.
        e = NaN,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~
!!! error TS2478: 'const' enum member initializer was evaluated to disallowed value 'NaN'.
        f = Infinity,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~~~~~
!!! error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
        g = -Infinity
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~~~~~~
!!! error TS2477: 'const' enum member initializer was evaluated to a non-finite value.
    }
    