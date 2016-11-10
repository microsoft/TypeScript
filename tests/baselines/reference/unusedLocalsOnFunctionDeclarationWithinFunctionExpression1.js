//// [unusedLocalsOnFunctionDeclarationWithinFunctionExpression1.ts]

var greeter = function (person: string, person2: string, person3: string) {
    var unused = 20;
    function maker(child: string): void {
        var unused2 = 22;
    }
    person2 = "dummy value";
}

//// [unusedLocalsOnFunctionDeclarationWithinFunctionExpression1.js]
var greeter = function (person, person2, person3) {
    var unused = 20;
    function maker(child) {
        var unused2 = 22;
    }
    person2 = "dummy value";
};
