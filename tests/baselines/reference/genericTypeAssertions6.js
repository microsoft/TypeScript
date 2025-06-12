//// [tests/cases/compiler/genericTypeAssertions6.ts] ////

//// [genericTypeAssertions6.ts]
class A<T,U> {
    constructor(x) {
        var y = <T>x;
        var z = <U>x;
    }

    f(x: T, y: U) {
        x = <T>y;
        y = <U>x;
    }
}

class B<T extends Date, U extends Date> extends A<T, U> {
    g(x: T) {
        var a: Date = x;
        var b = <Date>x;
        var c = <T>new Date();
        var d = <U>new Date();
        var e = <T><U>new Date();
    }
}

var b: B<Date, Date>;
var c: A<Date, Date> = <A<Date, Date>>b;

//// [genericTypeAssertions6.js]
class A {
    constructor(x) {
        var y = x;
        var z = x;
    }
    f(x, y) {
        x = y;
        y = x;
    }
}
class B extends A {
    g(x) {
        var a = x;
        var b = x;
        var c = new Date();
        var d = new Date();
        var e = new Date();
    }
}
var b;
var c = b;
