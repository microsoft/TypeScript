//// [tests/cases/compiler/unusedMultipleParameters1InFunctionDeclaration.ts] ////

//// [unusedMultipleParameters1InFunctionDeclaration.ts]
function greeter(person: string, person2: string) {
    var unused = 20;
    person2 = "dummy value";
}

//// [unusedMultipleParameters1InFunctionDeclaration.js]
function greeter(person, person2) {
    var unused = 20;
    person2 = "dummy value";
}
