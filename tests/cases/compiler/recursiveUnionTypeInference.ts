// @target: es2015
interface Foo<T> {
    x: T;
}

function bar<T>(x: Foo<T> | string): T {
    return bar(x);
}
