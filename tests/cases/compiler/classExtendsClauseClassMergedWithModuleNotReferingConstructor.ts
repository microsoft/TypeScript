class A {
    a: number;
}
module A {
    export var v: string;
}

module Foo {
    var A = 1;
    class B extends A {
        b: string;
    }
}