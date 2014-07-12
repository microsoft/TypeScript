//// [classSideInheritance3.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A(x) {
        this.x = x;
    }
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B(x, data) {
        _super.call(this, x);
        this.data = data;
    }
    return B;
})(A);
var C = (function (_super) {
    __extends(C, _super);
    function C(x) {
        _super.call(this, x);
    }
    return C;
})(A);

var r1 = B;
var r2 = B;
var r3 = C; // ok
