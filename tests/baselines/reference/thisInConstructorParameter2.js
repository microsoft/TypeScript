//// [thisInConstructorParameter2.ts]
class P {
    x = this;
    static y = this;

    constructor(public z = this, zz = this) { }

    foo(zz = this) { zz.x; }
    static bar(zz = this) { zz.y; }
}

//// [thisInConstructorParameter2.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
    __names(P.prototype, ["foo"]);
    P.y = this;
    return P;
}());
