//// [tests/cases/conformance/classes/constructorDeclarations/classConstructorAccessibility3.ts] ////

//// [classConstructorAccessibility3.ts]
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

//// [classConstructorAccessibility3.js]
class Foo {
    x;
    constructor(x) {
        this.x = x;
    }
}
class Bar {
    x;
    constructor(x) {
        this.x = x;
    }
}
class Baz {
    x;
    constructor(x) {
        this.x = x;
    }
}
class Qux {
    x;
    constructor(x) {
        this.x = x;
    }
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
