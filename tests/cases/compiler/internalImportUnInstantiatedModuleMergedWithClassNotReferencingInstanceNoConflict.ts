class A {
    aProp: string;
}
module A {
    export interface X { s: string }
}

module B {
    import Y = A;
}
