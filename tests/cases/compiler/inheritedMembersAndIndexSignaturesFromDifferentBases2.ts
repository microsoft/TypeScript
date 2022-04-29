interface A<T> {
    [n: number]: T;
}

interface B {
    foo: number;
}

interface C extends B, A<string> { } // Should succeed