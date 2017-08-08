//// [superAccess2.ts]
class P {
    x() { }
    static y() { }
}

class Q extends P {
    xx = super;
    static yy = super; // error for static initializer accessing super

    // Super is not allowed in constructor args
    constructor(public z = super, zz = super, zzz = () => super) {
        super();
    }

    foo(zz = super) {
        super.x();
        super.y(); // error
    }

    static bar(zz = super) {
        super.x(); // error
        super.y();
    }
}

//// [superAccess2.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var P = (function () {
    function P() {
    }
    P.prototype.x = function () { };
    P.y = function () { };
    __names(P.prototype, ["x"]);
    return P;
}());
var Q = (function (_super) {
    __extends(Q, _super);
    // Super is not allowed in constructor args
    function Q(z, zz, zzz) {
        if (z === void 0) { z = _super.prototype.; }
        if (zz === void 0) { zz = _super.prototype.; }
        if (zzz === void 0) { zzz = function () { return _super.prototype.; }; }
        var _this = _super.call(this) || this;
        _this.z = z;
        _this.xx = _super.prototype.;
        return _this;
    }
    Q.prototype.foo = function (zz) {
        if (zz === void 0) { zz = _super.prototype.; }
        _super.prototype.x.call(this);
        _super.prototype.y.call(this); // error
    };
    Q.bar = function (zz) {
        if (zz === void 0) { zz = _super.; }
        _super.x.call(this); // error
        _super.y.call(this);
    };
    __names(Q.prototype, ["foo"]);
    Q.yy = _super.; // error for static initializer accessing super
    return Q;
}(P));
