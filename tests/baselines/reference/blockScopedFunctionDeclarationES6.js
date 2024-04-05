//// [tests/cases/compiler/blockScopedFunctionDeclarationES6.ts] ////

//// [blockScopedFunctionDeclarationES6.ts]
if (true) {
    function foo() { }
    foo();
}
foo();

//// [blockScopedFunctionDeclarationES6.js]
if (true) {
    function foo() { }
    foo();
}
foo();
