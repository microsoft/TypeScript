//// [tests/cases/compiler/enumNumbering1.ts] ////

//// [enumNumbering1.ts]
enum Test {
    A,
    B,
    C = Math.floor(Math.random() * 1000),
    D = 10,
    E // Error but shouldn't be
}


/// [Declarations] ////



//// [enumNumbering1.d.ts]
declare enum Test {
    A = 0,
    B = 1,
    C,
    D = 10,
    E = 11
}

/// [Errors] ////

enumNumbering1.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== enumNumbering1.ts (1 errors) ====
    enum Test {
        A,
        B,
        C = Math.floor(Math.random() * 1000),
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        D = 10,
        E // Error but shouldn't be
    }
    