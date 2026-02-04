//// [tests/cases/compiler/functionExpressionAndLambdaMatchesFunction.ts] ////

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
"use strict";
class CDoc {
    constructor() {
        function doSomething(a) {
        }
        doSomething(() => undefined);
        doSomething(function () { });
    }
}
