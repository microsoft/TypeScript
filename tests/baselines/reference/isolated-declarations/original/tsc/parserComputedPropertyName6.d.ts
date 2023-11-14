//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName6.ts] ////

//// [parserComputedPropertyName6.ts]
var v = { [e]: 1, [e + e]: 2 };

/// [Declarations] ////



//// [parserComputedPropertyName6.d.ts]
declare var v: invalid;

/// [Errors] ////

parserComputedPropertyName6.ts(1,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserComputedPropertyName6.ts(1,12): error TS2304: Cannot find name 'e'.
parserComputedPropertyName6.ts(1,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserComputedPropertyName6.ts(1,20): error TS2304: Cannot find name 'e'.
parserComputedPropertyName6.ts(1,24): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName6.ts (5 errors) ====
    var v = { [e]: 1, [e + e]: 2 };
              ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
               ~
!!! error TS2304: Cannot find name 'e'.
                      ~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                       ~
!!! error TS2304: Cannot find name 'e'.
                           ~
!!! error TS2304: Cannot find name 'e'.