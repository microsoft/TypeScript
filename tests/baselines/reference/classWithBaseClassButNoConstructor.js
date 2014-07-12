//// [classWithBaseClassButNoConstructor.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base(x) {
    }
    return Base;
})();

var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(Base);

var r = C;
var c = new C();
var c2 = new C(1);

var Base2 = (function () {
    function Base2(x) {
    }
    return Base2;
})();

var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(Base2);

var r2 = D;
var d = new D();
var d2 = new D(1);

// specialized base class
var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        _super.apply(this, arguments);
    }
    return D2;
})(Base2);

var r3 = D2;
var d3 = new D();
var d4 = new D(1);

var D3 = (function (_super) {
    __extends(D3, _super);
    function D3() {
        _super.apply(this, arguments);
    }
    return D3;
})(Base2);

var r4 = D3;
var d5 = new D();
var d6 = new D(1); // ok
