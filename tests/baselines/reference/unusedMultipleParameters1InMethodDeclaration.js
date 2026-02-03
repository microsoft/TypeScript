//// [tests/cases/compiler/unusedMultipleParameters1InMethodDeclaration.ts] ////

//// [unusedMultipleParameters1InMethodDeclaration.ts]
class Dummy {
    public greeter(person: string, person2: string) {
        var unused = 20;
        person2 = "dummy value";
    }
}

//// [unusedMultipleParameters1InMethodDeclaration.js]
class Dummy {
    greeter(person, person2) {
        var unused = 20;
        person2 = "dummy value";
    }
}
