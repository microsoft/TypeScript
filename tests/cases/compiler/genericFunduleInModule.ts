namespace A {
    export function B<T>(x: T) { return x; }
    export namespace B {
        export var x = 1;
    }
}

var b: A.B;
A.B(1);