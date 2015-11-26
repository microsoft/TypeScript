// doc 2.5
// Every struct automatically contains a static property member named ‘prototype’,
// the type of which is the containing struct with type Any substituted for each type parameter.
// ok

module NonGeneric {
    struct C {
        foo: string;
    }

    struct D extends C {
        bar: string;
    }

    var r = C.prototype;
    r.foo; // any
    var r2 = D.prototype;
    r2.bar; // any
}

/* module Generic {
    struct C<T,U> {
        foo: T;
        bar: U;
    }

    struct D<T,U> extends C<T,U> {
        baz: T;
        bing: U;
    }

    var r = C.prototype; // C<any, any>
    var ra = r.foo; // any
    var r2 = D.prototype; // D<any, any>
    var rb = r2.baz; // any
} */