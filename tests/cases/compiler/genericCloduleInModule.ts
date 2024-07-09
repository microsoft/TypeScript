module A {
    export class B<T> {
        foo() { }
        static bar() { }
    }
    export module B {
        export var x = 1;
    }
}

var b: A.B<number>;
b.foo();