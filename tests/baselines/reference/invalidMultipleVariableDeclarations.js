//// [invalidMultipleVariableDeclarations.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
    return C2;
})(C);

var D = (function () {
    function D() {
    }
    return D;
})();

function F(x) {
    return 42;
}

var M;
(function (M) {
    var A = (function () {
        function A() {
        }
        return A;
    })();
    M.A = A;

    function F2(x) {
        return x.toString();
    }
    M.F2 = F2;
})(M || (M = {}));

// all of these are errors
var a;
var a = 1;
var a = 'a string';
var a = new C();
var a = new D();
var a = M;

var b;
var b = new C();
var b = new C2();

var f = F;
var f = function (x) {
    return '';
};

var arr;
var arr = [1, 2, 3, 4];
var arr = [new C(), new C2(), new D()];

var arr2 = [new D()];
var arr2 = new Array();

var m;
var m = M.A;
