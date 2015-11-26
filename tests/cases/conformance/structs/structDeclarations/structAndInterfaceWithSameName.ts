struct C { foo: string; }
interface C { foo: string; } // error

module M {
    struct D {
        bar: string;
    }

    interface D { // error
        bar: string;
    }
}