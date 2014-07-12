//// [genericTypeAssertions6.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A(x) {
        var y = x;
        var z = x;
    }
    A.prototype.f = function (x, y) {
        x = y;
        y = x;
    };
    return A;
})();

var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    B.prototype.g = function (x) {
        var a = x;
        var b = x;
        var c = new Date();
        var d = new Date();
        var e = new Date();
    };
    return B;
})(A);

var b;
var c = b;
