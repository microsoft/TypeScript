class C { foo: string; }
interface C { foo: string; } // error

module M {
    class D {
        bar: string;
    }

    interface D { // error
        bar: string;
    }
}