//// [tests/cases/compiler/unusedMultipleParameters2InMethodDeclaration.ts] ////

//// [unusedMultipleParameters2InMethodDeclaration.ts]
class Dummy {
    public greeter(person: string, person2: string, person3: string) {
        var unused = 20;
        person2 = "dummy value";
    }
}

//// [unusedMultipleParameters2InMethodDeclaration.js]
class Dummy {
    greeter(person, person2, person3) {
        var unused = 20;
        person2 = "dummy value";
    }
}
