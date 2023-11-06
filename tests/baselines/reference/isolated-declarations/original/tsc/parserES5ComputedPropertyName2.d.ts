//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName2.ts] ////

//// [parserES5ComputedPropertyName2.ts]
var v = { [e]: 1 };

/// [Declarations] ////



//// [/.src/parserES5ComputedPropertyName2.d.ts]
declare var v: invalid;
/// [Errors] ////

parserES5ComputedPropertyName2.ts(1,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserES5ComputedPropertyName2.ts(1,12): error TS2304: Cannot find name 'e'.


==== parserES5ComputedPropertyName2.ts (2 errors) ====
    var v = { [e]: 1 };
              ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
               ~
!!! error TS2304: Cannot find name 'e'.