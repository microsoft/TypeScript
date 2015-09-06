//// [letDeclarations-useBeforeDefinitionInFunctionScope.ts]
function foo() {
    a; // No Error
}
let a;

//// [letDeclarations-useBeforeDefinitionInFunctionScope.js]
function foo() {
    a; // No Error
}
var a;
