//// [tests/cases/compiler/constDeclarationShadowedByVarDeclaration2.ts] ////

//// [constDeclarationShadowedByVarDeclaration2.ts]
// No errors, const declaration is not shadowed
function outer() {
    const x = 0;
    function inner() {
        var x = "inner";
    }
}

//// [constDeclarationShadowedByVarDeclaration2.js]
// No errors, const declaration is not shadowed
function outer() {
    const x = 0;
    function inner() {
        var x = "inner";
    }
}
