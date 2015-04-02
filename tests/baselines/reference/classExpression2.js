//// [classExpression2.ts]
class D { }
var v = class C extends D {};

//// [classExpression2.js]
var D = (function () {
    function D() {
    }
    return D;
})();
var v = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(D);
