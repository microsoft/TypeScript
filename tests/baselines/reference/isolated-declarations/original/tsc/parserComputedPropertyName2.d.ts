//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName2.ts] ////

//// [parserComputedPropertyName2.ts]
var v = { [e]: 1 };

/// [Declarations] ////



//// [parserComputedPropertyName2.d.ts]
declare var v: invalid;
/// [Errors] ////

parserComputedPropertyName2.ts(1,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserComputedPropertyName2.ts(1,12): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName2.ts (2 errors) ====
    var v = { [e]: 1 };
              ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
               ~
!!! error TS2304: Cannot find name 'e'.