namespace A {
    export class B<T> {
        foo() { }
        static bar() { }
    }
    export namespace B {
        export var x = 1;
    }
}

var b: A.B<number>;
b.foo();