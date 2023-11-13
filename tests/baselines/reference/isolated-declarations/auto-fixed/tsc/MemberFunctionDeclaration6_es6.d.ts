//// [tests/cases/conformance/es6/memberFunctionDeclarations/MemberFunctionDeclaration6_es6.ts] ////

//// [MemberFunctionDeclaration6_es6.ts]
class C {
   *foo
}

/// [Declarations] ////



//// [MemberFunctionDeclaration6_es6.d.ts]
declare class C {
    foo(): any;
}

/// [Errors] ////

MemberFunctionDeclaration6_es6.ts(2,5): error TS2391: Function implementation is missing or not immediately following the declaration.
MemberFunctionDeclaration6_es6.ts(3,1): error TS1005: '(' expected.


==== MemberFunctionDeclaration6_es6.ts (2 errors) ====
    class C {
       *foo
        ~~~
!!! error TS2391: Function implementation is missing or not immediately following the declaration.
    }
    ~
!!! error TS1005: '(' expected.