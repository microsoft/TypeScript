interface A {
    (): string;
    (x: number): number;
}

interface A {
    (x: number, y: number): boolean;
}

var a: A;
var r = a();
var r2 = a(1);
var r3 = a(1, 2);

namespace G {
    interface A<T> {
        (): string;
        (x: T): T;
    }

    interface A<T> {
        (x: T, y: number): T;
        <U>(x: U, y: T): U;
    }

    var a: A<boolean>;
    var r = a();
    var r2 = a(true);
    var r3 = a(true, 2);
    var r4 = a(1, true);
}