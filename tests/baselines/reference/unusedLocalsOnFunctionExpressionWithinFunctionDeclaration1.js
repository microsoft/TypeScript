//// [unusedLocalsOnFunctionExpressionWithinFunctionDeclaration1.ts]
function greeter(person: string, person2: string) {
    var unused = 20;
    var maker = function (child: string): void {
        var unused2 = 22;
    }
    person2 = "dummy value";
}

//// [unusedLocalsOnFunctionExpressionWithinFunctionDeclaration1.js]
function greeter(person, person2) {
    var unused = 20;
    var maker = function (child) {
        var unused2 = 22;
    };
    person2 = "dummy value";
}
