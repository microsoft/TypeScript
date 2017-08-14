//// [functionExpressionAndLambdaMatchesFunction.ts]
class CDoc {
        constructor() {
        function doSomething(a: Function) {
        }
        doSomething(() => undefined);
        doSomething(function () { });
    }
}


//// [functionExpressionAndLambdaMatchesFunction.js]
var CDoc = /** @class */ (function () {
    function CDoc() {
        function doSomething(a) {
        }
        doSomething(function () { return undefined; });
        doSomething(function () { });
    }
    return CDoc;
}());
