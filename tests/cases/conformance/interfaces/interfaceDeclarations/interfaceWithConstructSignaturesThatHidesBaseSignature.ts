interface Foo {
    new (): { a: number };
}

interface Derived extends Foo {
    new (): { a: number; b: number };
}

var d: Derived;
var r = new d();