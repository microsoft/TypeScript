//// [unusedLocalsOnFunctionDeclarationWithinFunctionExpression2.ts]
var greeter = function (person: string, person2: string) {
    var unused = 20;
    function maker(child: string): void {
        var unused2 = 22;
    }
    function maker2(child2: string): void {
        var unused3 = 23;
    }
    maker2(person2);
}

//// [unusedLocalsOnFunctionDeclarationWithinFunctionExpression2.js]
var greeter = function (person, person2) {
    var unused = 20;
    function maker(child) {
        var unused2 = 22;
    }
    function maker2(child2) {
        var unused3 = 23;
    }
    maker2(person2);
};
