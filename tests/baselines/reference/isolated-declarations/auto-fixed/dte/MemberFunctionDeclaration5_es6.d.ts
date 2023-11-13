//// [tests/cases/conformance/es6/memberFunctionDeclarations/MemberFunctionDeclaration5_es6.ts] ////

//// [MemberFunctionDeclaration5_es6.ts]
class C {
   *
}

/// [Declarations] ////



//// [MemberFunctionDeclaration5_es6.d.ts]
declare class C {
    (): invalid;
}
/// [Errors] ////

MemberFunctionDeclaration5_es6.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
MemberFunctionDeclaration5_es6.ts(3,1): error TS1003: Identifier expected.


==== MemberFunctionDeclaration5_es6.ts (2 errors) ====
    class C {
       *
        
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    ~
!!! error TS1003: Identifier expected.