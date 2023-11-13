//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName27.ts] ////

//// [parserComputedPropertyName27.ts]
class C {
    // No ASI
    [e]: number = 0
    [e2]: number
}

/// [Declarations] ////



//// [parserComputedPropertyName27.d.ts]
declare class C {
    [e]: number;
    number: invalid;
}
/// [Errors] ////

parserComputedPropertyName27.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserComputedPropertyName27.ts(3,6): error TS2304: Cannot find name 'e'.
parserComputedPropertyName27.ts(3,6): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
parserComputedPropertyName27.ts(4,6): error TS2304: Cannot find name 'e2'.
parserComputedPropertyName27.ts(4,9): error TS1005: ';' expected.
parserComputedPropertyName27.ts(4,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== parserComputedPropertyName27.ts (6 errors) ====
    class C {
        // No ASI
        [e]: number = 0
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
         ~
!!! error TS2304: Cannot find name 'e'.
         ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
        [e2]: number
         ~~
!!! error TS2304: Cannot find name 'e2'.
            ~
!!! error TS1005: ';' expected.
              ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }