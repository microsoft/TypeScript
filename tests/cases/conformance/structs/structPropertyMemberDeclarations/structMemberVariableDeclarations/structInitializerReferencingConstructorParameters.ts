// doc 4.1
// Initializer expressions for instance member variables are evaluated in the scope of the struct constructor body but are not permitted to reference parameters or local variables of the constructor.

struct C {
    a = x; // error
    b: typeof x; // error
    constructor(x) { }
}

struct D {
    a = x; // error
    b: typeof x; // error
    constructor(public x) { }
}

struct E {
    a = this.x; // ok
    b: typeof this.x; // error
    constructor(public x) { }
}

/* struct F<T> {
    a = this.x; // ok
    b = x; // error
    constructor(public x: T) { }
}*/