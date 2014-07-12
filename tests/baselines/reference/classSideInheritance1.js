//// [classSideInheritance1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    A.bar = function () {
        return "";
    };
    A.prototype.foo = function () {
        return 1;
    };
    return A;
})();

var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
})(A);

var a;
var c;
a.bar(); // static off an instance - should be an error
c.bar(); // static off an instance - should be an error
A.bar(); // valid
C2.bar(); // valid
