// String indexer providing a constraint of a user defined type

class A {
    foo(): string { return ''; }
}

class B extends A {
    bar(): string { return ''; }
}

class Foo {
    [x: string]: A;
    a: A; // ok
    b: B; // ok
    c: number; // error
    d: string; // error
}

interface Foo2 {
    [x: string]: A;
    a: A; // ok
    b: B; // ok
    c: number; // error
    d: string; // error
}

var a: {
    [x: string]: A;
    a: A; // ok
    b: B; // ok
    c: number; // error
    d: string; // error
};

// error
var b: { [x: string]: A } = {
    a: A,
    b: B
}