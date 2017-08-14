//// [cannotInvokeNewOnErrorExpression.ts]
module M
{
    class ClassA {}
}
var t = new M.ClassA[];

//// [cannotInvokeNewOnErrorExpression.js]
var M;
(function (M) {
    var ClassA = /** @class */ (function () {
        function ClassA() {
        }
        return ClassA;
    }());
})(M || (M = {}));
var t = new M.ClassA[];
