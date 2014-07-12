//// [baseCheck.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function () {
    function C(x, y) {
    }
    return C;
})();
var ELoc = (function (_super) {
    __extends(ELoc, _super);
    function ELoc(x) {
        _super.call(this, 0, x);
    }
    return ELoc;
})(C);
var ELocVar = (function (_super) {
    __extends(ELocVar, _super);
    function ELocVar(x) {
        _super.call(this, 0, loc);
    }
    ELocVar.prototype.m = function () {
        var loc = 10;
    };
    return ELocVar;
})(C);

var D = (function (_super) {
    __extends(D, _super);
    function D(z) {
        _super.call(this, this.z);
        this.z = z;
    }
    return D;
})(C);
var E = (function (_super) {
    __extends(E, _super);
    function E(z) {
        _super.call(this, 0, this.z);
        this.z = z;
    }
    return E;
})(C);
var F = (function (_super) {
    __extends(F, _super);
    function F(z) {
        _super.call(this, "hello", this.z);
        this.z = z;
    }
    return F;
})(C);

function f() {
    if (x < 10) {
        x = 11;
    } else {
        x = 12;
    }
}
