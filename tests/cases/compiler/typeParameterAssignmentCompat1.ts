interface Foo<T> {
    frobble(value: T): T;
}

function f<T, U>(): Foo<U> {
    var x: Foo<T>;
    var y: Foo<U>;
    x = y; // should be an error
    return x;
}

class C<T> {
    f<U>(): Foo<U> {
        var x: Foo<T>;
        var y: Foo<U>;
        x = y; // should be an error
        return x;
    }
}