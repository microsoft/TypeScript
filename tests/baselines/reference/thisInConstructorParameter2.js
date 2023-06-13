//// [tests/cases/compiler/thisInConstructorParameter2.ts] ////

//// [thisInConstructorParameter2.ts]
class P {
    x = this;
    static y = this;

    constructor(public z = this, zz = this, zzz = (p = this) => this) {
        zzz = (p = this) => this;
    }

    foo(zz = this) { zz.x; }
    static bar(zz = this) { zz.y; }
}

//// [thisInConstructorParameter2.js]
var P = /** @class */ (function () {
    function P(z, zz, zzz) {
        if (z === void 0) { z = this; }
        if (zz === void 0) { zz = this; }
        if (zzz === void 0) { zzz = function (p) {
            if (p === void 0) { p = _this; }
            return _this;
        }; }
        var _this = this;
        this.z = z;
        this.x = this;
        zzz = function (p) {
            if (p === void 0) { p = _this; }
            return _this;
        };
    }
    P.prototype.foo = function (zz) {
        if (zz === void 0) { zz = this; }
        zz.x;
    };
    P.bar = function (zz) {
        if (zz === void 0) { zz = this; }
        zz.y;
    };
    var _a;
    _a = P;
    P.y = _a;
    return P;
}());
