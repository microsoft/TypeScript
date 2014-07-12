//// [genericCallWithObjectTypeArgsAndConstraints3.js]
// Generic call with constraints infering type parameter from object member properties
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    return Base;
})();
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    return Derived;
})(Base);
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
    }
    return Derived2;
})(Base);

function f(a) {
    var r;
    return r;
}

var r1 = f({ x: new Derived(), y: new Derived2() });

function f2(a) {
    var r;
    return r;
}

var r2 = f2({ x: new Derived(), y: new Derived2() });
var r3 = f2({ x: new Derived(), y: new Derived2() });

function f3(y, x) {
    return y(null);
}

// all ok - T gets fixed too early, but then defaults to Base and everything works out
var r4 = f3(function (x) {
    return x;
}, new Base());
var r5 = f3(function (x) {
    return x;
}, new Derived());
var r6 = f3(function (x) {
    return x;
}, null);
