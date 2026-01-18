class A<T extends { length: number }> {
    x: T;
}

class B<U> extends A<string> {
    y: U;
}

declare var x: A<{ length: number; foo: number }>;
declare var y: B<number>;
x = y;  // error
