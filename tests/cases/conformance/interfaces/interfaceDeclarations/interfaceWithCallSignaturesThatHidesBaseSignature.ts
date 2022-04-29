interface Foo {
    (): { a: number };
}

interface Derived extends Foo {
    (): { a: number; b: number };
}

var d: Derived;
var r = d();