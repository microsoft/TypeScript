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