//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName7.ts] ////

//// [parserES5ComputedPropertyName7.ts]
class C {
   [e]
}

/// [Declarations] ////



//// [parserES5ComputedPropertyName7.d.ts]
declare class C {
    [e]: invalid;
}

/// [Errors] ////

parserES5ComputedPropertyName7.ts(2,4): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserES5ComputedPropertyName7.ts(2,4): error TS9012: Property must have an explicit type annotation with --isolatedDeclarations
parserES5ComputedPropertyName7.ts(2,4): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
parserES5ComputedPropertyName7.ts(2,5): error TS2304: Cannot find name 'e'.
parserES5ComputedPropertyName7.ts(2,5): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.


==== parserES5ComputedPropertyName7.ts (5 errors) ====
    class C {
       [e]
       ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
       ~~~
!!! error TS9012: Property must have an explicit type annotation with --isolatedDeclarations
!!! related TS9029 parserES5ComputedPropertyName7.ts:2:4: Add a type annotation to the property [e]
       ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        ~
!!! error TS2304: Cannot find name 'e'.
        ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
    }