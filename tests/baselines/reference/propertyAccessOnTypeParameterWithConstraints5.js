//// [propertyAccessOnTypeParameterWithConstraints5.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
        return '';
    };
    return A;
})();

var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    B.prototype.bar = function () {
        return '';
    };
    return B;
})(A);

var C = (function () {
    function C() {
    }
    C.prototype.f = function () {
        var x;
        var a = x['foo']();
        return a + x.foo() + x.notHere();
    };
    return C;
})();

var r = (new C()).f();

var i;
var r2 = i.foo.notHere();
var r2b = i.foo['foo']();

var a;

// BUG 794164
var r3 = a().notHere();
var r3b = a()['foo']();

var b = {
    foo: function (x) {
        var a = x['foo']();
        return a + x.notHere();
    },
    // BUG 794164
    bar: b.foo(1).notHere()
};

var r4 = b.foo(new B()); // error after constraints above made illegal, doesn't matter
