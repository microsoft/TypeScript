//// [functionWithAnyReturnTypeAndNoReturnExpression.ts]
// All should be allowed
function f(): any { }
var f2: () => any = () => { };
var f3 = (): any => { };

//// [functionWithAnyReturnTypeAndNoReturnExpression.js]
// All should be allowed
function f() { }
var f2 = function f2() { };
var f3 = function () { };
