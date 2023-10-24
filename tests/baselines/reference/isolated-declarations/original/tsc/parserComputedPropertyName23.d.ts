//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName23.ts] ////

//// [parserComputedPropertyName23.ts]
declare class C {
    get [e](): number 
}

/// [Declarations] ////



//// [/.src/parserComputedPropertyName23.d.ts]
declare class C {
    get [e](): number;
}
/// [Errors] ////

parserComputedPropertyName23.ts(2,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserComputedPropertyName23.ts(2,10): error TS2304: Cannot find name 'e'.
parserComputedPropertyName23.ts(2,10): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.


==== parserComputedPropertyName23.ts (3 errors) ====
    declare class C {
        get [e](): number 
            ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~
!!! error TS2304: Cannot find name 'e'.
             ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
    }