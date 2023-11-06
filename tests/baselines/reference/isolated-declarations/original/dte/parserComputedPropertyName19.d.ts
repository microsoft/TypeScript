//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName19.ts] ////

//// [parserComputedPropertyName19.ts]
var v: { [e]? };

/// [Declarations] ////



//// [/.src/parserComputedPropertyName19.d.ts]
declare var v: {
    [e]?: any;
};
/// [Errors] ////

parserComputedPropertyName19.ts(1,10): error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
parserComputedPropertyName19.ts(1,11): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName19.ts (2 errors) ====
    var v: { [e]? };
             ~~~
!!! error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
              ~
!!! error TS2304: Cannot find name 'e'.