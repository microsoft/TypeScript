//// [overloadingOnConstants2.js]
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
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(C);
var E = (function () {
    function E() {
        this.y = 1;
    }
    return E;
})();

function foo(x, items) {
    return null;
}
var a = foo("hi", []);
var b = foo("bye", []);
var c = foo("um", []);


function bar(x, items) {
    return null;
}

var d = bar("hi", []);
var e = bar("bye", []);
var f = bar("um", []); // C
