module A {
    export interface X { s: string }
}

module B {
    var A = 1;
    import Y = A;
}
