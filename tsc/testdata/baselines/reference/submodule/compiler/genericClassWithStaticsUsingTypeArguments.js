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
class Foo {
    static a = (n) => { };
    static b;
    static c = [];
    static d = false || ((x) => x || undefined)(null);
    static e = function (x) { return null; };
    static f(xs) {
        return xs.reverse();
    }
}
