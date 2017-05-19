//// [unusedLocalsOnFunctionDeclarationWithinFunctionDeclaration1.ts]
function greeter(person: string, person2: string) {
    var unused = 20;
    function maker(child: string): void {
        var unused2 = 22;
    }
    person2 = "dummy value";
}

//// [unusedLocalsOnFunctionDeclarationWithinFunctionDeclaration1.js]
function greeter(person, person2) {
    var unused = 20;
    function maker(child) {
        var unused2 = 22;
    }
    person2 = "dummy value";
}
