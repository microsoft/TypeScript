// generic and non-generic interfaces with the same name do not merge

interface A {
    foo: string;
}

interface A<T> { // error
    bar: T;
}

namespace M {
    interface A<T> { 
        bar: T;
    }

    interface A { // error
        foo: string;
    }
}

namespace M2 {
    interface A {
        foo: string;
    }
}

namespace M2 {
    interface A<T> { // ok, different declaration space than other M2
        bar: T;
    }
}

namespace M3 {
    export interface A {
        foo: string;
    }
}

namespace M3 {
    export interface A<T> { // error
        bar: T;
    }
}