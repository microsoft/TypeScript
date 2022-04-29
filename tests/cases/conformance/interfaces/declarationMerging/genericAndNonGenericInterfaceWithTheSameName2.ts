// generic and non-generic interfaces with the same name do not merge

module M {
    interface A<T> {
        bar: T;
    }
}

module M2 {
    interface A { // ok
        foo: string;
    }
}

module N {
    module M {
        interface A<T> {
            bar: T;
        }
    }

    module M2 {
        interface A { // ok
            foo: string;
        }
    }
}