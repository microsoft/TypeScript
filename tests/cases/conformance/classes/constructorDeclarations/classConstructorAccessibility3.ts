// @declaration: true

class Foo {
     constructor(public x: number) { }
}

class Bar {
    public constructor(public x: number) { }
}

class Baz {
    protected constructor(public x: number) { }
}

class Qux {
     private constructor(public x: number) { }
}

// b is public
let a = Foo;
a = Bar;
a = Baz; // error Baz is protected
a = Qux; // error Qux is private

// b is protected
let b = Baz;
b = Foo;
b = Bar;
b = Qux; // error Qux is private

// c is private
let c = Qux;
c = Foo;
c = Bar;
c = Baz;