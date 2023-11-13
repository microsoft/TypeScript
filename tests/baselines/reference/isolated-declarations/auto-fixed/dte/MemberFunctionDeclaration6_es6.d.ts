//// [tests/cases/conformance/es6/memberFunctionDeclarations/MemberFunctionDeclaration6_es6.ts] ////

//// [MemberFunctionDeclaration6_es6.ts]
class C {
   *foo
}

/// [Declarations] ////



//// [MemberFunctionDeclaration6_es6.d.ts]
declare class C {
    foo(): invalid;
}
/// [Errors] ////

MemberFunctionDeclaration6_es6.ts(2,5): error TS2391: Function implementation is missing or not immediately following the declaration.
MemberFunctionDeclaration6_es6.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
MemberFunctionDeclaration6_es6.ts(3,1): error TS1005: '(' expected.


==== MemberFunctionDeclaration6_es6.ts (3 errors) ====
    class C {
       *foo
        ~~~
!!! error TS2391: Function implementation is missing or not immediately following the declaration.
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    ~
!!! error TS1005: '(' expected.