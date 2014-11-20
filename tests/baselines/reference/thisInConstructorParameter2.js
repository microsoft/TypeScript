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
    function P() {
        var z = (arguments[0] === void 0) ? this : arguments[0];
        var zz = (arguments[1] === void 0) ? this : arguments[1];
        this.z = z;
        this.x = this;
    }
    P.prototype.foo = function () {
        var zz = (arguments[0] === void 0) ? this : arguments[0];
        zz.x;
    };
    P.bar = function () {
        var zz = (arguments[0] === void 0) ? this : arguments[0];
        zz.y;
    };
    P.y = this;
    return P;
})();
