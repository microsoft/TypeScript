//// [tests/cases/compiler/superWithTypeArgument3.ts] ////

//// [superWithTypeArgument3.ts]
class C<T> {
    foo: T;
    bar<U>(x: U) { }
}

class D<T> extends C<T> {
    constructor() {
        super<T>();
    }
    bar() {
        super.bar<T>(null);
    }
}

//// [superWithTypeArgument3.js]
class C {
    foo;
    bar(x) { }
}
class D extends C {
    constructor() {
        super();
    }
    bar() {
        super.bar(null);
    }
}
