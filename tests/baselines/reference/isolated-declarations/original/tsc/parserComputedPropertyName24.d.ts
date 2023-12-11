//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName24.ts] ////

//// [parserComputedPropertyName24.ts]
class C {
    set [e](v) { }
}

/// [Declarations] ////



//// [parserComputedPropertyName24.d.ts]
declare class C {
    set [e](v: invalid);
}

/// [Errors] ////

parserComputedPropertyName24.ts(2,9): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
parserComputedPropertyName24.ts(2,10): error TS2304: Cannot find name 'e'.
parserComputedPropertyName24.ts(2,10): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
parserComputedPropertyName24.ts(2,13): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations


==== parserComputedPropertyName24.ts (4 errors) ====
    class C {
        set [e](v) { }
            ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
             ~
!!! error TS2304: Cannot find name 'e'.
             ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
                ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 parserComputedPropertyName24.ts:2:9: Add a type to parameter of the set accessor declaration
    }