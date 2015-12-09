//// [classExpression1.ts]
var v = class C {};

//// [classExpression1.js]
var v = (function () {
    function C() {
    }
    return C;
}());
