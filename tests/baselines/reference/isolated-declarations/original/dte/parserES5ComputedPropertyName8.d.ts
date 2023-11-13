//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName8.ts] ////

//// [parserES5ComputedPropertyName8.ts]
var v: { [e]: number };

/// [Declarations] ////



//// [parserES5ComputedPropertyName8.d.ts]
declare var v: {
    [e]: number;
};
/// [Errors] ////

parserES5ComputedPropertyName8.ts(1,10): error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
parserES5ComputedPropertyName8.ts(1,11): error TS2304: Cannot find name 'e'.


==== parserES5ComputedPropertyName8.ts (2 errors) ====
    var v: { [e]: number };
             ~~~
!!! error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
              ~
!!! error TS2304: Cannot find name 'e'.