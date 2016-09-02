//// [noEmitHelpers.ts]

class A { }
class B extends A { }


//// [noEmitHelpers.js]
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        var _this = _super.apply(this, arguments) || this;
        return _this;
    }
    return B;
}(A));
