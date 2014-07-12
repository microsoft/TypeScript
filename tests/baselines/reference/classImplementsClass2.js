//// [classImplementsClass2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
        return 1;
    };
    return A;
})();
var C = (function () {
    function C() {
    }
    return C;
})();

var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    C2.prototype.foo = function () {
        return 1;
    };
    return C2;
})(A);

var c;
var c2;
c = c2;
c2 = c;
