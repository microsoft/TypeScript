//// [gettersAndSetters.js]
// classes
var C = (function () {
    function C() {
        this.fooBack = "";
        this.bazBack = "";
        this.get = function () {
        };
        this.set = function () {
        };
    }
    Object.defineProperty(C.prototype, "Foo", {
        get: function () {
            return this.fooBack;
        },
        set: function (foo) {
            this.fooBack = foo;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(C, "Bar", {
        get: function () {
            return C.barBack;
        },
        set: function (bar) {
            C.barBack = bar;
        },
        enumerable: true,
        configurable: true
    });
    C.barBack = "";
    return C;
})();

var c = new C();

var foo = c.Foo;
c.Foo = "foov";

var bar = C.Bar;
C.Bar = "barv";

var baz = c.Baz;
c.Baz = "bazv";

// The Foo accessors' return and param types should be contextually typed to the Foo field
var o = { get Foo() {
        return 0;
    }, set Foo(val) {
        val;
    } };

var ofg = o.Foo;
o.Foo = 0;

var i = function (n) {
    return n;
};
