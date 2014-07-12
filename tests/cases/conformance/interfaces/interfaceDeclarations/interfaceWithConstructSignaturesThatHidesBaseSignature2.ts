interface Foo {
    new (): { a: number; b: number };
}

interface Derived extends Foo {
    new (): { a: number }; // constructors not checked for conformance like a call signature is
}

var d: Derived;
var r = new d();