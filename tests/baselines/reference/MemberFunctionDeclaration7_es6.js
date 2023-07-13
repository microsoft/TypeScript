//// [tests/cases/conformance/es6/memberFunctionDeclarations/MemberFunctionDeclaration7_es6.ts] ////

//// [MemberFunctionDeclaration7_es6.ts]
class C {
   *foo<T>() { }
}

//// [MemberFunctionDeclaration7_es6.js]
class C {
    *foo() { }
}
