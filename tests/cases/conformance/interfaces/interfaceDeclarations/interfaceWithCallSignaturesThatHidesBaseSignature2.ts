interface Foo {
    (): { a: number; b: number };
}

interface Derived extends Foo { // error
    (): { a: number };
}

var d: Derived;
var r = d();