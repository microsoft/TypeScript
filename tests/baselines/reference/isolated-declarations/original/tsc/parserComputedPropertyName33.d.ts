//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName33.ts] ////

//// [parserComputedPropertyName33.ts]
class C {
    // No ASI
    [e] = 0
    [e2]() { }
}

/// [Declarations] ////



//// [parserComputedPropertyName33.d.ts]
declare class C {
    [e]: invalid;
}

/// [Errors] ////

parserComputedPropertyName33.ts(3,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
parserComputedPropertyName33.ts(3,6): error TS2304: Cannot find name 'e'.
parserComputedPropertyName33.ts(3,6): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
parserComputedPropertyName33.ts(3,11): error TS9012: Property must have an explicit type annotation with --isolatedDeclarations
parserComputedPropertyName33.ts(4,6): error TS2304: Cannot find name 'e2'.
parserComputedPropertyName33.ts(4,12): error TS1005: ';' expected.
parserComputedPropertyName33.ts(5,1): error TS1128: Declaration or statement expected.


==== parserComputedPropertyName33.ts (7 errors) ====
    class C {
        // No ASI
        [e] = 0
        ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
         ~
!!! error TS2304: Cannot find name 'e'.
         ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
              ~
        [e2]() { }
    ~~~~~~~~~~
!!! error TS9012: Property must have an explicit type annotation with --isolatedDeclarations
!!! related TS9029 parserComputedPropertyName33.ts:3:5: Add a type annotation to the property [e]
         ~~
!!! error TS2304: Cannot find name 'e2'.
               ~
!!! error TS1005: ';' expected.
    }
    ~
!!! error TS1128: Declaration or statement expected.