//// [genericClassWithStaticsUsingTypeArguments.ts]
// Should be error to use 'T' in all declarations within Foo.
class Foo<T> {
    static a = (n: T) => { };

    static b: T;

    static c: T[] = [];

    static d = false || ((x: T) => x || undefined)(null)

    static e = function (x: T) { return null; }

    static f(xs: T[]): T[] {
        return xs.reverse();
    }
}


//// [genericClassWithStaticsUsingTypeArguments.js]
// Should be error to use 'T' in all declarations within Foo.
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.f = function (xs) {
        return xs.reverse();
    };
    Foo.a = function (n) { };
    Foo.c = [];
    Foo.d = false || (function (x) { return x || undefined; })(null);
    Foo.e = function (x) { return null; };
    return Foo;
}());
