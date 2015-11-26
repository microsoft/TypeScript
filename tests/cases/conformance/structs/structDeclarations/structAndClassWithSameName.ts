struct C { foo: string; }
class C { foo: string; } // error

module M {
    struct D {
        bar: string;
    }

    class D { // error
        bar: string;
    }
}