// doc 2.5
// If the struct contains a constructor declaration with overloads, a set of construct signatures with
// the parameter lists of the overloads, all having the same type parameters as the struct and returning
// the instance type of the struct.

module NonGeneric {
    struct C {
        constructor(x: string) { }
    }

    var c = new C(); // error
    var c2 = new C(''); // ok

    struct C2 {
        constructor(x: number);
        constructor(x: string);
        constructor(x: any) { }
    }

    var c3 = new C2(); // error
    var c4 = new C2(''); // ok
    var c5 = new C2(1); // ok

    struct D extends C2 { }

    var d = new D(); // error
    var d2 = new D(1); // ok
    var d3 = new D(''); // ok
}

/* module Generics {
    struct C<T> {
        constructor(x: T) { }
    }

    var c = new C(); // error
    var c2 = new C(''); // ok

    struct C2<T,U> {
        constructor(x: T);
        constructor(x: T, y: U);
        constructor(x: any) { }
    }

    var c3 = new C2(); // error
    var c4 = new C2(''); // ok
    var c5 = new C2(1, 2); // ok

    struct D<T, U> extends C2<T, U> { }

    var d = new D(); // error
    var d2 = new D(1); // ok
    var d3 = new D(''); // ok
} */