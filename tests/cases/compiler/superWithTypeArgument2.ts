class C<T> {
    foo: T;
}

class D<T> extends C<T> {
    constructor(x) {
        super<T>(x);
    }
}