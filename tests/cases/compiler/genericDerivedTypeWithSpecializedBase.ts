class A<T> {
    x: T;
}

class B<U> extends A<string> {
    y: U;
}

var x: A<number>;
var y: B<number>;
x = y;  // error
