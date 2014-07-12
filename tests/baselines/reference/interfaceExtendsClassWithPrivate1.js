//// [interfaceExtendsClassWithPrivate1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function () {
    function C() {
        this.x = 1;
    }
    C.prototype.foo = function (x) {
        return x;
    };
    return C;
})();

var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    D.prototype.foo = function (x) {
        return x;
    };
    D.prototype.other = function (x) {
        return x;
    };
    D.prototype.bar = function () {
    };
    return D;
})(C);

var c;
var i;
var d;

c = i;
i = c; // error

i = d;
d = i; // error

c = d;
d = c; // error
