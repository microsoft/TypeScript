//// [tests/cases/compiler/enumPropertyAccessBeforeInitalisation.ts] ////

//// [enumPropertyAccessBeforeInitalisation.ts]
enum E {
    A = A,
    B = E.B,
    C = E["C"],
    D = 1 + D
}


/// [Declarations] ////



//// [/.src/enumPropertyAccessBeforeInitalisation.d.ts]
declare enum E {
    A,
    B,
    C,
    D
}
/// [Errors] ////

enumPropertyAccessBeforeInitalisation.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumPropertyAccessBeforeInitalisation.ts(2,9): error TS2565: Property 'A' is used before being assigned.
enumPropertyAccessBeforeInitalisation.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumPropertyAccessBeforeInitalisation.ts(3,9): error TS2565: Property 'B' is used before being assigned.
enumPropertyAccessBeforeInitalisation.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumPropertyAccessBeforeInitalisation.ts(4,9): error TS2565: Property 'C' is used before being assigned.
enumPropertyAccessBeforeInitalisation.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumPropertyAccessBeforeInitalisation.ts(5,13): error TS2565: Property 'D' is used before being assigned.


==== enumPropertyAccessBeforeInitalisation.ts (8 errors) ====
    enum E {
        A = A,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~
!!! error TS2565: Property 'A' is used before being assigned.
        B = E.B,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~
!!! error TS2565: Property 'B' is used before being assigned.
        C = E["C"],
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~~~
!!! error TS2565: Property 'C' is used before being assigned.
        D = 1 + D
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~
!!! error TS2565: Property 'D' is used before being assigned.
    }
    