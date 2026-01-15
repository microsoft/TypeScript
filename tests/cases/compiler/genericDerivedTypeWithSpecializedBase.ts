class A<T> {
    x: T;
}

class B<U> extends A<string> {
    y: U;
}

declare var x: A<number>;
declare var y: B<number>;
x = y;  // error
