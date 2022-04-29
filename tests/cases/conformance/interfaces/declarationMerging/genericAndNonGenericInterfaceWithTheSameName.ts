// generic and non-generic interfaces with the same name do not merge

interface A {
    foo: string;
}

interface A<T> { // error
    bar: T;
}

module M {
    interface A<T> { 
        bar: T;
    }

    interface A { // error
        foo: string;
    }
}

module M2 {
    interface A {
        foo: string;
    }
}

module M2 {
    interface A<T> { // ok, different declaration space than other M2
        bar: T;
    }
}

module M3 {
    export interface A {
        foo: string;
    }
}

module M3 {
    export interface A<T> { // error
        bar: T;
    }
}