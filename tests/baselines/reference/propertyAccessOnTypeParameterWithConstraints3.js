//// [propertyAccessOnTypeParameterWithConstraints3.js]
// generic types should behave as if they have properties of their constraint type
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

        // BUG 823818
        var a = x['foo']();
        return a + x.foo();
    };

    C.prototype.g = function (x) {
        // BUG 823818
        var a = x['foo']();
        return a + x.foo();
    };
    return C;
})();

var r1a = (new C()).f();
var r1b = (new C()).g(new B());

var i;
var r2 = i.foo.foo();
var r2b = i.foo['foo']();

var a;
var r3 = a().foo();
var r3b = a()['foo']();

// parameter supplied for type argument inference for U
var r3c = a(new B()).foo();
var r3d = a(new B())['foo']();

var b = {
    foo: function (x) {
        // BUG 823818
        var a = x['foo']();
        return a + x.foo();
    }
};

var r4 = b.foo(new B()); // valid call to an invalid function
