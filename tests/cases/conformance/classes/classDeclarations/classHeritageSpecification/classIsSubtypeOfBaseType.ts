class Base<T> {
    foo: T;
}

class Derived extends Base<{ bar: string; }> {
    foo: {
        bar: string; baz: number; // ok
    }
}

class Derived2 extends Base<{ bar: string; }> {
    foo: {
        bar?: string; // error
    }
}