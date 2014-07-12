class C extends N.E { foo: string; } // error

module M {
    export class D extends C { bar: string; }

}

module N {
    export class E extends M.D { baz: number; }
}

module O {
    class C2<T> extends Q.E2<T> { foo: T; } // error

    module P {
        export class D2<T> extends C2<T> { bar: T; }
    }

    module Q {
        export class E2<T> extends P.D2<T> { baz: T; }
    }
}