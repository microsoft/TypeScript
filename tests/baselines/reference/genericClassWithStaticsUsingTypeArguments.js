//// [tests/cases/compiler/genericClassWithStaticsUsingTypeArguments.ts] ////

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
let Foo = (() => {
    class Foo {
        static f(xs) {
            return xs.reverse();
        }
    }
    Foo.a = (n) => { };
    Foo.c = [];
    Foo.d = false || ((x) => x || undefined)(null);
    Foo.e = function (x) { return null; };
    return Foo;
})();
