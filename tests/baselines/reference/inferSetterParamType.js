//// [inferSetterParamType.js]
var Foo = (function () {
    function Foo() {
    }
    Object.defineProperty(Foo.prototype, "bar", {
        get: function () {
            return 0;
        },
        set: function (n) {
        },
        enumerable: true,
        configurable: true
    });
    return Foo;
})();

var Foo2 = (function () {
    function Foo2() {
    }
    Object.defineProperty(Foo2.prototype, "bar", {
        get: function () {
            return 0;
        },
        set: function (n) {
        },
        enumerable: true,
        configurable: true
    });
    return Foo2;
})();
