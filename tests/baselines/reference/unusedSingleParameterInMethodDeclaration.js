//// [tests/cases/compiler/unusedSingleParameterInMethodDeclaration.ts] ////

//// [unusedSingleParameterInMethodDeclaration.ts]
class Dummy {
    public greeter(person: string) {
        var unused = 20;
    }
}

//// [unusedSingleParameterInMethodDeclaration.js]
class Dummy {
    greeter(person) {
        var unused = 20;
    }
}
