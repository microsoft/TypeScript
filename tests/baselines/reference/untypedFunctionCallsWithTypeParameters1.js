//// [untypedFunctionCallsWithTypeParameters1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// none of these function calls should be allowed
var x = function () {
    return;
};
var r1 = x();
var y = x;
var r2 = y();

var c;
var r3 = c();

var C = (function () {
    function C() {
        this.prototype = null;
        this.length = 1;
        this.arguments = null;
        this.caller = function () {
        };
    }
    return C;
})();

var c2;
var r4 = c2();

var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
})(Function);
var c3;
var r5 = c3();

var z;
var r6 = z(1);

var c4;
c4(1);

var c5;
c5(1); // error
