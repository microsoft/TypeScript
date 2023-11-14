//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName1.ts] ////

//// [parserComputedPropertyName1.ts]
var v = { [e] };

/// [Declarations] ////



//// [parserComputedPropertyName1.d.ts]
declare var v: invalid;

/// [Errors] ////

parserComputedPropertyName1.ts(1,12): error TS2304: Cannot find name 'e'.
parserComputedPropertyName1.ts(1,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserComputedPropertyName1.ts(1,15): error TS1005: ':' expected.


==== parserComputedPropertyName1.ts (3 errors) ====
    var v = { [e] };
               ~
!!! error TS2304: Cannot find name 'e'.
                 
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                  ~
!!! error TS1005: ':' expected.