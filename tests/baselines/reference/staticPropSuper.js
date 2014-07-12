//// [staticPropSuper.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    return A;
})();

var B = (function (_super) {
    __extends(B, _super);
    function B() {
        var x = 1;
        _super.call(this);
    }
    B.s = 9;
    return B;
})(A);

var C = (function (_super) {
    __extends(C, _super);
    function C() {
        var x = 1;
        this.p = 10;
    }
    return C;
})(A);

var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var x = 1;
        this.p = 11;
    }
    return D;
})(A);

var E = (function (_super) {
    __extends(E, _super);
    function E() {
        var x = 1;
        this.p = 12;
    }
    return E;
})(A);
