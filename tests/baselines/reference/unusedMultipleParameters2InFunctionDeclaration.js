//// [unusedMultipleParameters2InFunctionDeclaration.ts]
function greeter(person: string, person2: string, person3: string) {
    var unused = 20;
    person2 = "dummy value";
}

//// [unusedMultipleParameters2InFunctionDeclaration.js]
function greeter(person, person2, person3) {
    var unused = 20;
    person2 = "dummy value";
}
