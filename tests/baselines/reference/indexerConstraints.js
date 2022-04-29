//// [indexerConstraints.ts]
interface A { a: number; }
interface B extends A { b: number; }

// Good case
interface D {
    [s: string]: A;
}
interface D {
    [n: number]: B;
}

// Bad case
interface E {
    [s: string]: B;
}
interface E {
    [n: number]: A;
}

// Inheritance
interface F {
    [s: string]: B;
}
interface G extends F {
    [n: number]: A;
}

// Other way
interface H {
    [n: number]: A;
}
interface I extends H {
    [s: string]: B;
}

// With hidden indexer
interface J {
    [n: number]: {};
}
interface K extends J {
    [n: number]: A;
    [s: string]: B;
}

//// [indexerConstraints.js]
