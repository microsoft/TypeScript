//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName24.ts] ////

//// [parserComputedPropertyName24.ts]
class C {
    set [e](v) { }
}

/// [Declarations] ////



//// [/.src/parserComputedPropertyName24.d.ts]
declare class C {
    set [e](v: invalid);
}
/// [Errors] ////

parserComputedPropertyName24.ts(2,10): error TS2304: Cannot find name 'e'.
parserComputedPropertyName24.ts(2,10): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
parserComputedPropertyName24.ts(2,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== parserComputedPropertyName24.ts (3 errors) ====
    class C {
        set [e](v) { }
             ~
!!! error TS2304: Cannot find name 'e'.
             ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
                ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }