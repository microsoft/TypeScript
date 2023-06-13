//// [tests/cases/compiler/unusedSingleParameterInFunctionDeclaration.ts] ////

//// [unusedSingleParameterInFunctionDeclaration.ts]
function greeter(person: string) {
    var unused = 20;
}

//// [unusedSingleParameterInFunctionDeclaration.js]
function greeter(person) {
    var unused = 20;
}
