module A {
    export interface X { s: string }
    export var a = 10;
}

module B {
    var A = 1;
    import Y = A;
}
