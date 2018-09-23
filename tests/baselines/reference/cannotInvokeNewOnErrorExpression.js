//// [cannotInvokeNewOnErrorExpression.ts]
module M
{
    class ClassA {}
}
var t = new M.ClassA[];

//// [cannotInvokeNewOnErrorExpression.js]
var M = M || (M = {});
(function (M) {
    var ClassA = /** @class */ (function () {
        function ClassA() {
        }
        return ClassA;
    }());
})(M);
var t = new M.ClassA[];
