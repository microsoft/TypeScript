//// [__extends.ts]
var __extends;

class A { }
class B extends A { }

//// [__extends.js]
var __extends;
var A = (function () {
    function A() {
    }
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);
