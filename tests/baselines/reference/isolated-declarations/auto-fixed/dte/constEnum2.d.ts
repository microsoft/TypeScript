//// [tests/cases/conformance/constEnums/constEnum2.ts] ////

//// [constEnum2.ts]
// An enum declaration that specifies a const modifier is a constant enum declaration.
// In a constant enum declaration, all members must have constant values and
// it is an error for a member declaration to specify an expression that isn't classified as a constant enum expression.

// Error : not a constant enum expression

const CONST: number = 9000 % 2;
const enum D {
    d = 10,
    e = 199 * Math.floor(Math.random() * 1000),
    f = d - (100 * Math.floor(Math.random() % 8)),
    g = CONST,
}

/// [Declarations] ////



//// [constEnum2.d.ts]
declare const CONST: number;
declare const enum D {
    d = 10,
    e,
    f,
    g
}
/// [Errors] ////

constEnum2.ts(10,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnum2.ts(10,9): error TS2474: const enum member initializers must be constant expressions.
constEnum2.ts(11,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnum2.ts(11,9): error TS2474: const enum member initializers must be constant expressions.
constEnum2.ts(12,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnum2.ts(12,9): error TS2474: const enum member initializers must be constant expressions.


==== constEnum2.ts (6 errors) ====
    // An enum declaration that specifies a const modifier is a constant enum declaration.
    // In a constant enum declaration, all members must have constant values and
    // it is an error for a member declaration to specify an expression that isn't classified as a constant enum expression.
    
    // Error : not a constant enum expression
    
    const CONST: number = 9000 % 2;
    const enum D {
        d = 10,
        e = 199 * Math.floor(Math.random() * 1000),
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2474: const enum member initializers must be constant expressions.
        f = d - (100 * Math.floor(Math.random() % 8)),
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2474: const enum member initializers must be constant expressions.
        g = CONST,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~~
!!! error TS2474: const enum member initializers must be constant expressions.
    }