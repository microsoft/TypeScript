function f<A, B extends A>() {
    var a: A;
    var b: B;
    a = b; // Error: Can't convert B to A
}