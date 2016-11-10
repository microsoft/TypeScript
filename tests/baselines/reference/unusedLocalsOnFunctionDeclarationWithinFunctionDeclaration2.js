//// [unusedLocalsOnFunctionDeclarationWithinFunctionDeclaration2.ts]

function greeter(person: string, person2: string, person3: string) {
    var unused = 20;
    function maker(child: string): void {
        var unused2 = 22;
    }
    function maker2(child2: string): void {
        var unused3 = 23;
    }
    maker2(person2);
}

//// [unusedLocalsOnFunctionDeclarationWithinFunctionDeclaration2.js]
function greeter(person, person2, person3) {
    var unused = 20;
    function maker(child) {
        var unused2 = 22;
    }
    function maker2(child2) {
        var unused3 = 23;
    }
    maker2(person2);
}
