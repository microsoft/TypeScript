//// [unusedMultipleParameters2InFunctionDeclaration.ts]

function greeter(person: string, person2: string) {
    var unused = 20;
    person2 = "dummy value";
}

//// [unusedMultipleParameters2InFunctionDeclaration.js]
function greeter(person, person2) {
    var unused = 20;
    person2 = "dummy value";
}
