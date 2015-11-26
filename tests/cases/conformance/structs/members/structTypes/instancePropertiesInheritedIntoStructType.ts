// doc 2.4
// All base struct instance type property that are not overridden in the struct
// ok

module NonGeneric {
    struct C {
        x: string;
        fn() { return this; }
        constructor(public a: number, private b: number) { }
    }

    struct D extends C { e: string; }

    var d = new D(1, 2);
    var r = d.fn();
    var r2 = r.x;

}

/* module Generic {
    struct C<T, U> {
        x: T;
        fn() { return this; }
        constructor(public a: T, private b: U) { }
    }

    struct D<T, U> extends C<T, U> { e: T; }

    var d = new D(1, '');
    var r = d.fn();
    var r2 = r.x;
} */