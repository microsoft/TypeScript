//// [tests/cases/conformance/es6/memberFunctionDeclarations/MemberFunctionDeclaration5_es6.ts] ////

//// [MemberFunctionDeclaration5_es6.ts]
class C {
   *
}

/// [Declarations] ////



//// [/.src/MemberFunctionDeclaration5_es6.d.ts]
declare class C {
    (): any;
}
/// [Errors] ////

MemberFunctionDeclaration5_es6.ts(3,1): error TS1003: Identifier expected.


==== MemberFunctionDeclaration5_es6.ts (1 errors) ====
    class C {
       *
    }
    ~
!!! error TS1003: Identifier expected.