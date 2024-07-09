class A<T extends { length: number }> {
    x: T;
}

class B<U> extends A<string> {
    y: U;
}

var x: A<{ length: number; foo: number }>;
var y: B<number>;
x = y;  // error
