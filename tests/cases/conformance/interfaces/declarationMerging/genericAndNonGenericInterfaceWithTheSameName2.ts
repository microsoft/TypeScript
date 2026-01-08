// generic and non-generic interfaces with the same name do not merge

namespace M {
    interface A<T> {
        bar: T;
    }
}

namespace M2 {
    interface A { // ok
        foo: string;
    }
}

namespace N {
    namespace M {
        interface A<T> {
            bar: T;
        }
    }

    namespace M2 {
        interface A { // ok
            foo: string;
        }
    }
}