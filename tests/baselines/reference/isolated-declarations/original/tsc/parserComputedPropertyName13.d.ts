//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName13.ts] ////

//// [parserComputedPropertyName13.ts]
var v: { [e]: number };

/// [Declarations] ////



//// [/.src/parserComputedPropertyName13.d.ts]
declare var v: {};
/// [Errors] ////

parserComputedPropertyName13.ts(1,10): error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
parserComputedPropertyName13.ts(1,11): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName13.ts (2 errors) ====
    var v: { [e]: number };
             ~~~
!!! error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
              ~
!!! error TS2304: Cannot find name 'e'.