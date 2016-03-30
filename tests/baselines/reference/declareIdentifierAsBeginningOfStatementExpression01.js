//// [declareIdentifierAsBeginningOfStatementExpression01.ts]
class C {
}

var declare: any;

declare instanceof C;

//// [declareIdentifierAsBeginningOfStatementExpression01.js]
var C = (function () {
    function C() {
    }
    return C;
}());
var declare;
declare instanceof C;
