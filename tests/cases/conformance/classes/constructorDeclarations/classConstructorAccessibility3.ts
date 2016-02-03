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
b = Foo; // error Foo is public
b = Bar; // error Baz is public
b = Qux; // error Qux is private

// c is private
let c = Qux;
c = Foo; // error Foo is public
c = Bar; // error Bar is public
c = Baz; // error Baz is protected