struct C extends N.E { foo: string; } // error

module M {
    export struct D extends C { bar: string; }

}

module N {
    export struct E extends M.D { baz: number; }
}

/* module O {
    struct C2<T> extends Q.E2<T> { foo: T; } // error

    module P {
        export struct D2<T> extends C2<T> { bar: T; }
    }

    module Q {
        export struct E2<T> extends P.D2<T> { baz: T; }
    }
}