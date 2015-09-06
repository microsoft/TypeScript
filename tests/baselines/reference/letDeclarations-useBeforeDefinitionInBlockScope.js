//// [letDeclarations-useBeforeDefinitionInBlockScope.ts]
if (false) {
    b; // still an error
}
let b;

//// [letDeclarations-useBeforeDefinitionInBlockScope.js]
if (false) {
    b; // still an error
}
var b;
