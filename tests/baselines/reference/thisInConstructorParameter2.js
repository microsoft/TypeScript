//// [thisInConstructorParameter2.ts]
class P {
    x = this;
    static y = this;

    constructor(public z = this, zz = this) { }

    foo(zz = this) { zz.x; }
    static bar(zz = this) { zz.y; }
}

//// [thisInConstructorParameter2.js]
var P = (function () {
    function P(z, zz) {
        if (z === void 0) { z = this; }
        if (zz === void 0) { zz = this; }
        this.z = z;
        this.x = this;
    }
    P.prototype.foo = function (zz) {
        if (zz === void 0) { zz = this; }
        zz.x;
    };
    P.bar = function (zz) {
        if (zz === void 0) { zz = this; }
        zz.y;
    };
    return P;
}());
P.y = this;
