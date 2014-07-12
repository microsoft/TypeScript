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
