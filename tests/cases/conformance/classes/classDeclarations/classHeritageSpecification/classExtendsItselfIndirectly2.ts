class C extends N.E { foo: string; } // error

namespace M {
    export class D extends C { bar: string; }

}

namespace N {
    export class E extends M.D { baz: number; }
}

namespace O {
    class C2<T> extends Q.E2<T> { foo: T; } // error

    namespace P {
        export class D2<T> extends C2<T> { bar: T; }
    }

    namespace Q {
        export class E2<T> extends P.D2<T> { baz: T; }
    }
}