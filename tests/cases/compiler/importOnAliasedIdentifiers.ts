module A {
    export interface X { s: string }
    export var X: X;
}
module B {
    interface A { n: number }
    import Y = A; // Alias only for module A
    import Z = A.X; // Alias for both type and member A.X
    var v: Z = Z;
}