class A {
    aProp: string;
}
module A {
    export interface X { s: string }
    export var a = 10;
}

module B {
    import Y = A;
}
