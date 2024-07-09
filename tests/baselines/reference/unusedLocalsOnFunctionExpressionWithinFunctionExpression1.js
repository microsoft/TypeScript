//// [tests/cases/compiler/unusedLocalsOnFunctionExpressionWithinFunctionExpression1.ts] ////

//// [unusedLocalsOnFunctionExpressionWithinFunctionExpression1.ts]
var greeter = function (person: string, person2: string) {
    var unused = 20;
    var maker = function (child: string): void {
        var unused2 = 22;
    }
    person2 = "dummy value";
}

//// [unusedLocalsOnFunctionExpressionWithinFunctionExpression1.js]
var greeter = function (person, person2) {
    var unused = 20;
    var maker = function (child) {
        var unused2 = 22;
    };
    person2 = "dummy value";
};
