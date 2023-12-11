//// [tests/cases/conformance/es6/memberFunctionDeclarations/MemberFunctionDeclaration3_es6.ts] ////

//// [MemberFunctionDeclaration3_es6.ts]
class C {
   *[foo]() { }
}

/// [Declarations] ////



//// [MemberFunctionDeclaration3_es6.d.ts]
declare class C {
    [foo](): invalid;
}

/// [Errors] ////

MemberFunctionDeclaration3_es6.ts(2,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
MemberFunctionDeclaration3_es6.ts(2,6): error TS2304: Cannot find name 'foo'.


==== MemberFunctionDeclaration3_es6.ts (2 errors) ====
    class C {
       *[foo]() { }
        ~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 MemberFunctionDeclaration3_es6.ts:2:5: Add a return type to the method
         ~~~
!!! error TS2304: Cannot find name 'foo'.
    }