//// [tests/cases/compiler/genericTypeAssertions2.ts] ////

//// [genericTypeAssertions2.ts]
class A<T> { foo(x: T) { } }
class B<T> extends A<T> {
    bar(): T {
        return null;
    }
}

var foo = new A<number>();
var r: A<string> = <B<string>>new B();
var r2: A<number> = <B<string>>new B(); // error
var r3: B<number> = <A<number>>new B(); // error
var r4: A<number> = <A<number>>new A();
var r5: A<number> = <A<number>>[]; // error

//// [genericTypeAssertions2.js]
class A {
    foo(x) { }
}
class B extends A {
    bar() {
        return null;
    }
}
var foo = new A();
var r = new B();
var r2 = new B();
var r3 = new B();
var r4 = new A();
var r5 = [];
