//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName31.ts] ////

//// [parserComputedPropertyName31.ts]
class C {
    // yes ASI
    [e]: number
    [e2]: number
}

/// [Declarations] ////



//// [parserComputedPropertyName31.d.ts]
declare class C {
    [e]: number;
    [e2]: number;
}

/// [Errors] ////

parserComputedPropertyName31.ts(3,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserComputedPropertyName31.ts(3,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
parserComputedPropertyName31.ts(3,6): error TS2304: Cannot find name 'e'.
parserComputedPropertyName31.ts(3,6): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
parserComputedPropertyName31.ts(4,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserComputedPropertyName31.ts(4,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
parserComputedPropertyName31.ts(4,6): error TS2304: Cannot find name 'e2'.
parserComputedPropertyName31.ts(4,6): error TS4031: Public property '[e2]' of exported class has or is using private name 'e2'.


==== parserComputedPropertyName31.ts (8 errors) ====
    class C {
        // yes ASI
        [e]: number
        ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
         ~
!!! error TS2304: Cannot find name 'e'.
         ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
        [e2]: number
        ~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        ~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
         ~~
!!! error TS2304: Cannot find name 'e2'.
         ~~
!!! error TS4031: Public property '[e2]' of exported class has or is using private name 'e2'.
    }