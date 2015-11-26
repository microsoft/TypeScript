// doc 4.2
// In the body of a static member function declaration, the type of this is the constructor
// function type.
// ok
struct C {
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
}

/* struct D<T> {
    x: T;
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
}

struct E<T extends Date> {
    x: T;
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
} */