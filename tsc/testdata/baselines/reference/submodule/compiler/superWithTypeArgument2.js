//// [tests/cases/compiler/superWithTypeArgument2.ts] ////

//// [superWithTypeArgument2.ts]
class C<T> {
    foo: T;
}

class D<T> extends C<T> {
    constructor(x) {
        super<T>(x);
    }
}

//// [superWithTypeArgument2.js]
class C {
    foo;
}
class D extends C {
    constructor(x) {
        super(x);
    }
}
