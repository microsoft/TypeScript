//// [tests/cases/compiler/blockScopedFunctionDeclarationES5.ts] ////

//// [blockScopedFunctionDeclarationES5.ts]
if (true) {
    function foo() { }
    foo();
}
foo();

//// [blockScopedFunctionDeclarationES5.js]
if (true) {
    function foo() { }
    foo();
}
foo();
